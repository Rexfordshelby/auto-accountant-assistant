
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/lib/supabase";
import { FilePlus, Download, Trash2, Plus, Save, FileText, Send } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SubscriptionGuard from '@/components/SubscriptionGuard';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}

const InvoiceGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    document.title = "Invoice Generator | Accountly";
    
    // Set due date to 30 days from now by default
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 30);
    setDueDate(defaultDueDate.toISOString().split('T')[0]);
    
    // Generate invoice number (format: INV-YYYYMMDD-XXX)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setInvoiceNumber(`INV-${year}${month}${day}-${random}`);
    
    // Fetch clients if user is logged in
    if (user) {
      fetchClients();
    }
  }, [user]);
  
  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, email, address')
        .eq('user_id', user?.id)
        .order('name', { ascending: true });
        
      if (error) throw error;
      
      if (data) {
        setClients(data);
        if (data.length > 0) {
          setSelectedClient(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Failed to load clients",
        description: "Please try again or add a new client.",
        variant: "destructive",
      });
    }
  };
  
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0
    };
    
    setItems([...items, newItem]);
  };
  
  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate amount if quantity or unitPrice changed
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.unitPrice);
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setItems(updatedItems);
  };
  
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  const handleSaveInvoice = async () => {
    if (!selectedClient || items.length === 0) {
      toast({
        title: "Unable to save invoice",
        description: "Please select a client and add at least one item.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 1. Insert invoice
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          user_id: user?.id,
          client_id: selectedClient,
          invoice_number: invoiceNumber,
          issue_date: issueDate,
          due_date: dueDate,
          total_amount: calculateTotal(),
          status: 'draft',
          notes: notes
        })
        .select()
        .single();
        
      if (invoiceError) throw invoiceError;
      
      // 2. Insert invoice items
      const invoiceItems = items.map(item => ({
        invoice_id: invoiceData.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        amount: item.amount
      }));
      
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItems);
        
      if (itemsError) throw itemsError;
      
      toast({
        title: "Invoice saved",
        description: `Invoice ${invoiceNumber} has been saved as a draft.`,
      });
      
      // Reset form or navigate to invoice list
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        title: "Failed to save invoice",
        description: "There was an error saving your invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendInvoice = async () => {
    toast({
      title: "Invoice sent",
      description: "This feature is coming soon. Your invoice has been saved as a draft.",
    });
    
    await handleSaveInvoice();
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "Invoice downloaded",
      description: "This feature would generate and download a PDF in a production environment.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-up">
            <h1 className="text-4xl font-semibold mb-3">Invoice Generator</h1>
            <p className="text-gray-600">
              Create professional invoices for your clients and track payments
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8 animate-fade-up" style={{animationDelay: '100ms'}}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Invoice Details</CardTitle>
                  <CardDescription>Basic information about the invoice</CardDescription>
                </CardHeader>
                
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input 
                      id="invoiceNumber" 
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input 
                      id="issueDate" 
                      type="date" 
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input 
                      id="dueDate" 
                      type="date" 
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Additional notes or payment instructions" 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-up" style={{animationDelay: '200ms'}}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">Invoice Items</CardTitle>
                      <CardDescription>Products or services you're billing for</CardDescription>
                    </div>
                    <Button 
                      onClick={addItem} 
                      variant="outline" 
                      className="flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40%]">Description</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit Price</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                              No items yet. Click "Add Item" to get started.
                            </TableCell>
                          </TableRow>
                        ) : (
                          items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Input 
                                  placeholder="Item description"
                                  value={item.description}
                                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  value={item.quantity}
                                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                  className="w-20"
                                />
                              </TableCell>
                              <TableCell>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  step="0.01"
                                  value={item.unitPrice}
                                  onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                                  className="w-28"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                ${item.amount.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeItem(item.id)}
                                  className="h-8 w-8"
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="animate-fade-up" style={{animationDelay: '300ms'}}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Invoice Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Tax (10%)</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">${calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-up" style={{animationDelay: '400ms'}}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Actions</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <Button
                    className="w-full flex items-center gap-2"
                    onClick={handleSaveInvoice}
                    disabled={isLoading}
                  >
                    <Save size={16} />
                    Save as Draft
                  </Button>
                  
                  <Button
                    className="w-full flex items-center gap-2"
                    variant="outline"
                    onClick={handleSendInvoice}
                    disabled={isLoading}
                  >
                    <Send size={16} />
                    Save & Send
                  </Button>
                  
                  <SubscriptionGuard requiredTier="starter">
                    <Button
                      className="w-full flex items-center gap-2"
                      variant="outline"
                      onClick={handleDownloadPDF}
                    >
                      <Download size={16} />
                      Download PDF
                    </Button>
                  </SubscriptionGuard>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InvoiceGenerator;
