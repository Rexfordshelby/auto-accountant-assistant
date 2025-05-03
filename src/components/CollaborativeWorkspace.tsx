
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Edit, Users, MessageSquare, Clock, Send, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  role: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
}

interface Activity {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: Date;
}

const CollaborativeWorkspace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState<string>('');
  const [activeUsers, setActiveUsers] = useState<User[]>([
    { id: '1', name: 'Jane Cooper', status: 'online', role: 'Accountant' },
    { id: '2', name: 'Alex Murphy', status: 'online', role: 'Client' },
    { id: '3', name: 'Sarah Lin', status: 'away', role: 'Tax Specialist' }
  ]);
  
  const [comments, setComments] = useState<Comment[]>([
    { 
      id: '1', 
      user: { id: '1', name: 'Jane Cooper', status: 'online', role: 'Accountant' }, 
      text: 'I've updated the Q2 expense report with the new categorization system.',
      timestamp: new Date(Date.now() - 25 * 60000)
    },
    { 
      id: '2', 
      user: { id: '3', name: 'Sarah Lin', status: 'away', role: 'Tax Specialist' }, 
      text: 'The new depreciation schedule looks good. I've added notes on the tax implications.',
      timestamp: new Date(Date.now() - 10 * 60000)
    }
  ]);
  
  const [activities, setActivities] = useState<Activity[]>([
    { 
      id: '1', 
      user: { id: '1', name: 'Jane Cooper', status: 'online', role: 'Accountant' }, 
      action: 'updated',
      target: 'Q2 Financial Report',
      timestamp: new Date(Date.now() - 30 * 60000)
    },
    { 
      id: '2', 
      user: { id: '2', name: 'Alex Murphy', status: 'online', role: 'Client' }, 
      action: 'viewed',
      target: 'Tax Filing Documents',
      timestamp: new Date(Date.now() - 15 * 60000)
    },
    { 
      id: '3', 
      user: { id: '3', name: 'Sarah Lin', status: 'away', role: 'Tax Specialist' }, 
      action: 'commented on',
      target: 'Depreciation Schedule',
      timestamp: new Date(Date.now() - 5 * 60000)
    }
  ]);

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      user: { 
        id: 'self', 
        name: user?.user_metadata?.full_name || 'You', 
        status: 'online',
        role: 'User'
      },
      text: message,
      timestamp: new Date()
    };
    
    setComments([...comments, newComment]);
    setMessage('');
    
    // Add to activity
    const newActivity: Activity = {
      id: Date.now().toString(),
      user: { 
        id: 'self', 
        name: user?.user_metadata?.full_name || 'You', 
        status: 'online',
        role: 'User'
      },
      action: 'commented on',
      target: 'Financial Report',
      timestamp: new Date()
    };
    
    setActivities([newActivity, ...activities]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const inviteUser = () => {
    toast({
      title: "Invitation sent",
      description: "Collaboration invitation has been sent to the user.",
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users size={20} className="text-green-600" />
              Collaborative Workspace
            </CardTitle>
            <CardDescription>
              Work together in real-time with your team and clients
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            {activeUsers.length} Active Users
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="comments" className="flex items-center gap-1">
              <MessageSquare size={14} />
              Comments
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <Clock size={14} />
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="comments" className="p-4">
            <div className="h-64 overflow-y-auto mb-4 space-y-4">
              {comments.map((comment) => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <Avatar>
                    <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                      {comment.user.name.charAt(0)}
                    </div>
                  </Avatar>
                  
                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs py-0 h-5">
                          {comment.user.role}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">{comment.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Type your comment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!message.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="p-4">
            <div className="h-64 overflow-y-auto space-y-2">
              {activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {activity.user.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>
                      {' '}
                      <span className="text-gray-600">{activity.action}</span>
                      {' '}
                      <span className="font-medium text-blue-600">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 pb-4 border-t bg-gray-50">
        <div className="flex -space-x-2">
          {activeUsers.map((activeUser) => (
            <div key={activeUser.id} className="relative">
              <Avatar className="border-2 border-white">
                <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                  {activeUser.name.charAt(0)}
                </div>
              </Avatar>
              <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${
                activeUser.status === 'online' ? 'bg-green-500' : 
                activeUser.status === 'away' ? 'bg-amber-500' : 'bg-gray-500'
              }`}></div>
            </div>
          ))}
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-8 w-8 bg-white"
            onClick={inviteUser}
          >
            +
          </Button>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <Lock size={12} />
            <span>End-to-end encrypted</span>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Edit size={14} />
            <span className="hidden sm:inline">Share Document</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollaborativeWorkspace;
