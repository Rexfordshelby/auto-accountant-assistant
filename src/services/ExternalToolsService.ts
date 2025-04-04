
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

// Mock data store for external connections
const mockConnections: Record<string, ExternalToolConnection[]> = {};

export class ExternalToolsService {
  static async getUserConnections(userId: string): Promise<ExternalToolConnection[]> {
    try {
      // Return mock connections if they exist for this user
      return mockConnections[userId] || [];
    } catch (error) {
      console.error('Error fetching user connections:', error);
      return [];
    }
  }

  static async connectTool(userId: string, providerId: string): Promise<boolean> {
    try {
      // Create mock connection
      const newConnection: ExternalToolConnection = {
        id: `conn_${Math.random().toString(36).substring(2, 9)}`,
        provider: providerId,
        status: 'connected',
        lastSync: new Date(),
        metadata: {}
      };
      
      // Initialize user connections array if it doesn't exist
      if (!mockConnections[userId]) {
        mockConnections[userId] = [];
      }
      
      // Add the new connection
      mockConnections[userId].push(newConnection);
      
      return true;
    } catch (error) {
      console.error('Error connecting tool:', error);
      return false;
    }
  }

  static async disconnectTool(connectionId: string): Promise<boolean> {
    try {
      // Find and update the connection in our mock store
      for (const userId in mockConnections) {
        const connectionIndex = mockConnections[userId].findIndex(conn => conn.id === connectionId);
        if (connectionIndex !== -1) {
          mockConnections[userId][connectionIndex].status = 'disconnected';
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error disconnecting tool:', error);
      return false;
    }
  }

  static async syncTool(connectionId: string): Promise<boolean> {
    try {
      // Find and update the connection in our mock store
      for (const userId in mockConnections) {
        const connectionIndex = mockConnections[userId].findIndex(conn => conn.id === connectionId);
        if (connectionIndex !== -1) {
          mockConnections[userId][connectionIndex].lastSync = new Date();
          mockConnections[userId][connectionIndex].status = 'connected';
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error syncing tool:', error);
      return false;
    }
  }
}
