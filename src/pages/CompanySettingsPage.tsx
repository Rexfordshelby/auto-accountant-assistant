
import React from 'react';
import CompanySettings from '@/components/CompanySettings';

const CompanySettingsPage = () => {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Company Settings</h1>
      <div className="mb-8">
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Manage your company profile and settings. These details will be used throughout the platform.
        </p>
      </div>
      <CompanySettings />
    </div>
  );
};

export default CompanySettingsPage;
