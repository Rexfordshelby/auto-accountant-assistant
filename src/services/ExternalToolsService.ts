
import { supabase } from '@/lib/supabase';

export interface ExternalToolConnection {
  id: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSync?: Date;
  metadata?: Record<string, any>;
}

export interface ToolProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
}

export const availableProviders: ToolProvider[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Connect your QuickBooks account to import transactions and financial data.',
    icon: '/icons/quickbooks-logo.png',
    isAvailable: true,
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Sync your Xero accounting data with Accountly.',
    icon: '/icons/xero-logo.png',
    isAvailable: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Import your Stripe payments, invoices, and subscription data.',
    icon: '/icons/stripe-logo.png',
    isAvailable: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Connect your PayPal business account to track transactions.',
    icon: '/icons/paypal-logo.png',
    isAvailable: true,
  },
  {
    id: 'square',
    name: 'Square',
    description: 'Import transactions and sales data from your Square account.',
    icon: '/icons/square-logo.png',
    isAvailable: false,
  },
];

export class ExternalToolsService {
  static async getUserConnections(userId: string): Promise<ExternalToolConnection[]> {
    try {
      const { data, error } = await supabase
        .from('external_tool_connections')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error fetching user connections:', error);
      return [];
    }
  }

  static async connectTool(userId: string, providerId: string): Promise<boolean> {
    try {
      // In a real application, this would initiate OAuth flow
      // This is a simplified mock implementation
      const { error } = await supabase
        .from('external_tool_connections')
        .insert({
          user_id: userId,
          provider: providerId,
          status: 'connected',
          last_sync: new Date().toISOString(),
          metadata: {}
        });
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error connecting tool:', error);
      return false;
    }
  }

  static async disconnectTool(connectionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('external_tool_connections')
        .update({ status: 'disconnected' })
        .eq('id', connectionId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error disconnecting tool:', error);
      return false;
    }
  }

  static async syncTool(connectionId: string): Promise<boolean> {
    try {
      // In a real application, this would trigger a sync with the external API
      const { error } = await supabase
        .from('external_tool_connections')
        .update({ 
          last_sync: new Date().toISOString(),
          status: 'connected'
        })
        .eq('id', connectionId);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error syncing tool:', error);
      return false;
    }
  }
}
