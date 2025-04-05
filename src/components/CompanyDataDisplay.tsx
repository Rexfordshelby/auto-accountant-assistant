
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Building, FileUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const CompanyDataDisplay = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<{
    companyName?: string;
    logoUrl?: string;
    businessType?: string;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCompanyData();
    }
  }, [user]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('business_type, preferences')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      const businessTypeMap: Record<string, string> = {
        'corporation': 'Corporation',
        'sole_proprietor': 'Sole Proprietor',
        'partnership': 'Partnership',
        'llc': 'LLC',
        'small_business': 'Small Business',
        'personal': 'Personal Finance'
      };

      const preferences = data.preferences as Record<string, any> || {};
      
      setCompanyData({
        companyName: preferences.companyName || 'Your Company',
        logoUrl: preferences.logoUrl || null,
        businessType: businessTypeMap[data.business_type] || data.business_type
      });
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadData = () => {
    // Navigate to a page where users can upload financial data
    navigate('/upload-data');
  };

  const handleEditSettings = () => {
    navigate('/company-settings');
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Company Profile</CardTitle>
        <Button variant="outline" size="sm" onClick={handleEditSettings}>
          Edit Settings
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {companyData.logoUrl ? (
            <div className="w-24 h-24 rounded-md overflow-hidden border flex-shrink-0">
              <img 
                src={companyData.logoUrl} 
                alt={`${companyData.companyName} Logo`} 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-gray-50 flex-shrink-0">
              <Building className="h-12 w-12 text-gray-300" />
            </div>
          )}
          
          <div className="space-y-1">
            <h3 className="text-xl font-medium">{companyData.companyName}</h3>
            <p className="text-sm text-muted-foreground">{companyData.businessType}</p>
            <div className="pt-3">
              <Button 
                size="sm" 
                className="gap-2"
                onClick={handleUploadData}
              >
                <Upload className="h-4 w-4" />
                Upload Financial Data
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDataDisplay;
