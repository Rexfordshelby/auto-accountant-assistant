
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Calendar, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Understanding the 2025 Tax Law Changes",
    excerpt: "An overview of the most significant tax code changes for 2025 and how they might affect your business and personal finances.",
    date: "April 28, 2025",
    author: "Sarah Johnson, CPA",
    category: "Tax",
    tags: ["Tax Changes", "2025 Planning", "Tax Law"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "7 min read"
  },
  {
    id: 2,
    title: "Streamlining Your Accounting Workflows",
    excerpt: "Discover practical strategies to optimize your accounting processes using modern technology and best practices.",
    date: "April 22, 2025",
    author: "Michael Chen, CFA",
    category: "Accounting",
    tags: ["Efficiency", "Automation", "Best Practices"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Small Business Compliance Checklist for 2025",
    excerpt: "A comprehensive guide to help small businesses ensure they're meeting all regulatory requirements in the coming year.",
    date: "April 15, 2025",
    author: "Emily Rodriguez, J.D.",
    category: "Compliance",
    tags: ["Small Business", "Regulations", "Checklist"],
    image: "https://images.unsplash.com/photo-1664575198308-3959904fa430?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "8 min read"
  },
  {
    id: 4,
    title: "The Future of Audit: AI and Human Expertise",
    excerpt: "How artificial intelligence is transforming the audit profession while emphasizing the continued importance of human judgment.",
    date: "April 10, 2025",
    author: "David Williams, CPA",
    category: "Audit",
    tags: ["AI", "Future Trends", "Technology"],
    image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Financial Forecasting Techniques for Uncertain Markets",
    excerpt: "Learn advanced forecasting methods that can help businesses navigate economic uncertainty and plan for multiple scenarios.",
    date: "April 5, 2025",
    author: "Jennifer Lee, MBA",
    category: "Advisory",
    tags: ["Forecasting", "Strategy", "Risk Management"],
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "International Tax Considerations for Remote Workers",
    excerpt: "As remote work becomes permanent, businesses face complex international tax implications. Here's what you need to know.",
    date: "April 1, 2025",
    author: "Robert Thompson, Tax Specialist",
    category: "Tax",
    tags: ["Remote Work", "International Tax", "Compliance"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "7 min read"
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  };

  const filterByCategory = (category: string) => {
    if (category === 'all') {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Accountly Blog</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Insights, analysis, and practical guidance on tax, accounting, and financial management.
              </p>
              <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400" />
                <Button type="submit" className="absolute right-1 top-1">Search</Button>
              </form>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4">{blogPosts[0].category}</Badge>
                <h3 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center mb-6">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-500 mr-4">{blogPosts[0].author}</span>
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-500">{blogPosts[0].date}</span>
                </div>
                <Button className="flex items-center">
                  Read Article
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Categories */}
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" onValueChange={filterByCategory}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tax">Tax</TabsTrigger>
                <TabsTrigger value="accounting">Accounting</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="audit">Audit</TabsTrigger>
                <TabsTrigger value="advisory">Advisory</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-500 mr-4">{post.author}</span>
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-500">{post.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full flex justify-center items-center">
                        Read More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Same structure for other tabs, content will be filtered by the filterByCategory function */}
            <TabsContent value="tax" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <Badge>{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-500 mr-4">{post.author}</span>
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-500">{post.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full flex justify-center items-center">
                        Read More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Newsletter Signup */}
        <div className="container mx-auto px-4 py-16 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
            <div className="md:flex items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay updated with the latest in accounting, tax, and financial insights. We'll send you our best articles monthly.
                </p>
              </div>
              <div className="md:w-1/3">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
