
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, FileText, Loader2 } from 'lucide-react';
import SubscriptionGuard from '@/components/SubscriptionGuard';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  business_type: string;
  tax_id: string;
  created_at: string;
}

const ClientsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [taxId, setTaxId] = useState('');
  
  useEffect(() => {
    document.title = "Clients | Accountly";
    fetchClients();
  }, [user]);
  
  const fetchClients = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('name');
        
      if (error) throw error;
      
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: 'Error',
        description: 'Failed to load clients. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setBusinessType('');
    setTaxId('');
    setEditingClient(null);
  };
  
  const handleOpenForm = (client: Client | null = null) => {
    if (client) {
      // Editing existing client
      setName(client.name);
      setEmail(client.email || '');
      setPhone(client.phone || '');
      setAddress(client.address || '');
      setBusinessType(client.business_type || '');
      setTaxId(client.tax_id || '');
      setEditingClient(client);
    } else {
      // New client
      resetForm();
    }
    setFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setFormOpen(false);
    resetForm();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: 'Validation Error',
        description: 'Client name is required',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const clientData = {
        name,
        email,
        phone,
        address,
        business_type: businessType,
        tax_id: taxId,
        user_id: user?.id,
      };
      
      if (editingClient) {
        // Update existing client
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', editingClient.id);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Client updated successfully',
        });
      } else {
        // Create new client
        const { error } = await supabase
          .from('clients')
          .insert(clientData);
          
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Client added successfully',
        });
      }
      
      handleCloseForm();
      fetchClients();
    } catch (error) {
      console.error('Error saving client:', error);
      toast({
        title: 'Error',
        description: 'Failed to save client. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Client deleted successfully',
      });
      
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete client. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleCreateInvoice = (clientId: string) => {
    // Navigate to invoice creation page with client ID
    navigate('/tools/invoice-generator?client=' + clientId);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Clients</h1>
              <p className="text-gray-600">Manage your clients and their information</p>
            </div>
            
            <SubscriptionGuard requiredTier="starter">
              <Button onClick={() => handleOpenForm()} className="flex items-center gap-2">
                <Plus size={16} />
                Add Client
              </Button>
            </SubscriptionGuard>
          </div>
          
          <SubscriptionGuard 
            requiredTier="starter"
            fallback={
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-medium text-blue-800 mb-2">Upgrade to Access Client Management</h3>
                <p className="text-blue-600 mb-4">
                  Client management is available on the Starter plan and above. Upgrade your subscription to add and manage clients.
                </p>
                <Button onClick={() => navigate('/pricing')} variant="outline" className="bg-white">
                  View Pricing Plans
                </Button>
              </div>
            }
          >
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : clients.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No Clients Yet</h3>
                <p className="text-gray-600 mb-4">
                  You haven't added any clients yet. Add your first client to get started.
                </p>
                <Button onClick={() => handleOpenForm()} className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Your First Client
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <Table>
                  <TableCaption>A list of your clients.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Business Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.business_type}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCreateInvoice(client.id)}
                              title="Create Invoice"
                            >
                              <FileText size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleOpenForm(client)}
                              title="Edit Client"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(client.id)}
                              title="Delete Client"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </SubscriptionGuard>
          
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
                <DialogDescription>
                  {editingClient 
                    ? 'Update the client information below.'
                    : 'Fill in the client information to add them to your records.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Client name"
                    required
                  />
                </div>
                
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
                
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Client address"
                  />
                </div>
                
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input 
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="Corporation, LLC, etc."
                  />
                </div>
                
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input 
                    id="taxId"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    placeholder="Tax identification number"
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={handleCloseForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingClient ? 'Save Changes' : 'Add Client'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientsPage;
