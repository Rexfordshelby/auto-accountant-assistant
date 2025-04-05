
import React from 'react';
import FinancialDataUpload from '@/components/FinancialDataUpload';

const UploadDataPage = () => {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Upload Financial Data</h1>
      <div className="mb-8">
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Upload your financial documents to help us analyze and manage your accounting. 
          We support various file formats including spreadsheets, PDFs, and images of receipts.
        </p>
      </div>
      <FinancialDataUpload />
    </div>
  );
};

export default UploadDataPage;
