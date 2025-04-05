
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileUp, Database, Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FinancialDataUpload = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [processingStatus, setProcessingStatus] = useState('');

  const fileTypes = [
    { id: 'bank_statement', label: 'Bank Statement' },
    { id: 'invoice', label: 'Invoice' },
    { id: 'receipt', label: 'Receipt' },
    { id: 'tax_document', label: 'Tax Document' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'general_ledger', label: 'General Ledger' },
    { id: 'trial_balance', label: 'Trial Balance' },
    { id: 'balance_sheet', label: 'Balance Sheet' },
    { id: 'income_statement', label: 'Income Statement' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      setFile(event.target.files[0]);
      setUploadStatus('idle');
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  const handleUpload = async () => {
    if (!file || !fileType || !user) {
      toast({
        title: "Missing information",
        description: "Please select a file type and file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    setProcessingStatus('Uploading file...');
    try {
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${fileType}_${timestamp}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('financial-documents')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      setProcessingStatus('Processing data...');
      
      // Get public URL
      const { data } = supabase.storage
        .from('financial-documents')
        .getPublicUrl(filePath);
      
      // Record the upload in the database
      const { error: dbError } = await supabase
        .from('financial_documents')
        .insert({
          user_id: user.id,
          document_type: fileType,
          file_name: file.name,
          file_path: filePath,
          file_url: data?.publicUrl,
          status: 'processing',
          metadata: {
            size: file.size,
            type: file.type,
            uploaded_at: new Date().toISOString()
          }
        });
      
      if (dbError) throw dbError;
      
      setUploadStatus('success');
      toast({
        title: "File uploaded successfully",
        description: "Your financial data is being processed.",
      });
      
      // Reset form
      setFile(null);
      setFileType('');
      
      // Simulate processing (in a real app, this would be handled by a backend process)
      setTimeout(() => {
        setProcessingStatus('Data processed successfully!');
        setTimeout(() => {
          setProcessingStatus('');
          navigate('/dashboard');
        }, 2000);
      }, 3000);
      
    } catch (error: any) {
      console.error('Error uploading financial data:', error);
      setUploadStatus('error');
      toast({
        title: "Error uploading file",
        description: error.message || "There was an error uploading your file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Upload Financial Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fileType">Document Type</Label>
          <Select 
            value={fileType} 
            onValueChange={setFileType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {fileTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Upload File</Label>
          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
            {file ? (
              <div className="flex flex-col items-center">
                <div className="text-sm font-medium">{file.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                {uploadStatus === 'success' && (
                  <div className="flex items-center gap-1 text-green-600 mt-2">
                    <Check className="h-4 w-4" />
                    <span className="text-xs">Upload successful</span>
                  </div>
                )}
                {uploadStatus === 'error' && (
                  <div className="flex items-center gap-1 text-red-600 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Upload failed</span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                <div className="text-sm font-medium">Drag and drop your file here</div>
                <div className="text-xs text-muted-foreground mb-4">
                  Supported formats: PDF, CSV, XLS, XLSX, JPG, PNG
                </div>
              </>
            )}
            <Label 
              htmlFor="file-upload" 
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
            >
              Browse Files
            </Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.csv,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </div>
        </div>

        {processingStatus && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
            {processingStatus}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleUpload}
          disabled={!file || !fileType || uploading}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload Financial Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FinancialDataUpload;
