
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileUp, Save, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const CompanySettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCompanyProfile();
    }
  }, [user]);

  const loadCompanyProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('preferences')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data?.preferences) {
        const preferences = data.preferences as Record<string, any>;
        setCompanyName(preferences.companyName || '');
        setLogoUrl(preferences.logoUrl || '');
      }
    } catch (error) {
      console.error('Error loading company profile:', error);
      toast({
        title: "Failed to load company profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/company-logo.${fileExt}`;

      // Check if storage bucket exists, if not it will be created in the next SQL migration
      const { error: uploadError } = await supabase.storage
        .from('company-logos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('company-logos')
        .getPublicUrl(filePath);

      if (data) {
        setLogoUrl(data.publicUrl);
        // Save the logo URL to the user's preferences
        await saveCompanyProfile(companyName, data.publicUrl);
      }

      toast({
        title: "Logo uploaded successfully",
        description: "Your company logo has been updated.",
      });
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Error uploading logo",
        description: error.message || "There was an error uploading your logo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const saveCompanyProfile = async (name: string, logo: string = logoUrl) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('preferences')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      const currentPreferences = profileData?.preferences as Record<string, any> || {};
      
      const { error } = await supabase
        .from('profiles')
        .update({
          preferences: {
            ...currentPreferences,
            companyName: name,
            logoUrl: logo
          }
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your company information has been updated.",
      });

      setCompanyName(name);
    } catch (error) {
      console.error('Error saving company profile:', error);
      toast({
        title: "Error saving settings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCompanyProfile(companyName);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Company Settings
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <div className="flex flex-col space-y-4">
              {logoUrl && (
                <div className="w-32 h-32 relative overflow-hidden rounded-md border">
                  <img 
                    src={logoUrl} 
                    alt="Company Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <Label 
                htmlFor="logo-upload" 
                className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2 rounded-md border bg-background hover:bg-accent transition-colors"
              >
                <FileUp className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload Logo'}
              </Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CompanySettings;
