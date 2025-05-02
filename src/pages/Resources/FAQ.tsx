
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from 'lucide-react';

// Sample FAQ data
const faqData = {
  tax: [
    {
      question: "How does the US tax system differ from other countries?",
      answer: "The US tax system is unique in several ways. It taxes citizens and permanent residents on worldwide income regardless of residence, has a progressive federal income tax with multiple brackets, includes state and local taxes that vary by location, and has a complex system of deductions and credits. Unlike many other countries, the US doesn't have a national VAT or GST, instead utilizing state-level sales taxes."
    },
    {
      question: "What's the difference between VAT and sales tax?",
      answer: "Sales tax is collected only at the final point of sale to the consumer, while Value Added Tax (VAT) is collected at each stage of production and distribution. With VAT, businesses can claim credit for the tax they pay on purchases, effectively making it a tax only on the 'value added' at each stage. Sales tax is common in the US, while VAT is prevalent in Europe, Canada (as GST/HST), and many other countries."
    },
    {
      question: "How do I know if I need to file taxes in multiple countries?",
      answer: "You may need to file taxes in multiple countries if you: are a citizen or resident of one country but earn income in another, live in one country but are a citizen of another (especially relevant for US citizens), own property or investments abroad, or work temporarily in a foreign country. Many countries have tax treaties to prevent double taxation, but you still may need to file returns in each jurisdiction. It's advisable to consult with a tax professional experienced in international taxation."
    },
    {
      question: "When are tax returns due in different countries?",
      answer: "Tax deadlines vary globally: US - April 15th (with extensions available); UK - January 31st for online returns; Canada - April 30th; Australia - October 31st; Germany - July 31st (with extensions); India - July 31st for individuals; France - May/June depending on location and filing method. Many countries offer extensions, and deadlines may be different for businesses or self-employed individuals."
    },
    {
      question: "What documents do I need to prepare for tax filing?",
      answer: "Essential documents include: income statements (W-2s, 1099s, pay slips); bank and investment account statements; property tax records; mortgage interest statements; receipts for deductible expenses (medical, education, business, charitable donations); retirement account contributions; previous year's tax returns; and personal identification information. Specific requirements vary by country and individual circumstances."
    },
  ],
  accounting: [
    {
      question: "What's the difference between cash and accrual accounting?",
      answer: "Cash accounting records transactions only when money changes hands. Revenue is recorded when payment is received, and expenses when they're paid. Accrual accounting records transactions when they're earned or incurred, regardless of when cash is exchanged. Revenue is recorded when earned (even if not yet received), and expenses when incurred (even if not yet paid). Accrual accounting gives a more accurate picture of financial health but is more complex to maintain."
    },
    {
      question: "How often should a business reconcile its accounts?",
      answer: "Most businesses should reconcile accounts monthly to catch errors quickly, maintain accurate financial records, and provide timely financial information for decision-making. However, high-volume businesses might benefit from more frequent reconciliation (weekly or bi-weekly), while very small businesses with few transactions might reconcile quarterly. Bank accounts, credit cards, accounts receivable and payable, and inventory should all be regularly reconciled."
    },
    {
      question: "What accounting software is best for small businesses?",
      answer: "Popular options include QuickBooks (comprehensive features, widely used by accountants), Xero (user-friendly, good for collaboration), FreshBooks (excellent for service-based businesses and invoicing), Wave (free option for very small businesses), and Sage (scalable for growing businesses). The best choice depends on your specific needs, industry, budget, number of users, and required features like inventory management, payroll, or foreign currency handling."
    },
    {
      question: "How long should I keep accounting records?",
      answer: "General recommendation is to keep tax returns and supporting documents for at least 7 years. Payroll records typically need to be kept for 3-7 years depending on the country. Permanent records like incorporation documents, major contracts, property records, and audit reports should be kept indefinitely. Electronic records are acceptable in most jurisdictions if they're complete, accurate, and accessible. Always check specific requirements for your country and industry, as some sectors have longer retention requirements."
    },
    {
      question: "What are the common accounting mistakes small businesses make?",
      answer: "Common mistakes include: mixing personal and business finances (keep separate accounts); not tracking small expenses (which add up); delayed recording of transactions (leading to inaccurate reporting); improper classification of expenses; neglecting account reconciliation; ignoring tax obligations until filing time; failing to plan for major expenses; and trying to handle complex accounting without professional help. Regular financial reviews and working with a qualified accountant can help avoid these issues."
    },
  ],
  compliance: [
    {
      question: "What is regulatory compliance in finance?",
      answer: "Financial regulatory compliance refers to following the laws, rules, and standards set by governmental agencies and industry organizations that govern financial activities. This includes securities regulations, banking laws, tax requirements, anti-money laundering provisions, data protection laws, and industry-specific regulations. Compliance programs aim to prevent, detect, and address violations of these rules to avoid legal penalties, reputation damage, and business disruption."
    },
    {
      question: "How often do tax laws change?",
      answer: "Tax laws change frequently, with minor adjustments occurring annually in most countries (like inflation adjustments to tax brackets). Major tax reforms typically happen every 5-10 years, though this varies greatly by country. The US saw significant tax reform in 2017 with the Tax Cuts and Jobs Act. Currently, the UK adjusts tax policies annually in the Budget. Businesses and individuals should stay informed through official government tax agency websites, professional tax advisors, or reliable news sources specializing in tax matters."
    },
    {
      question: "What is GDPR and does it affect my business?",
      answer: "The General Data Protection Regulation (GDPR) is a European Union regulation on data protection and privacy that took effect in 2018. It applies to any organization that processes personal data of EU residents, regardless of where the organization is located. If you collect, store, or process data from EU residents (including customers, employees, or business contacts), you must comply with GDPR requirements such as obtaining explicit consent, providing data access rights, ensuring data security, reporting breaches, and documenting compliance. Non-compliance can result in significant fines of up to €20 million or 4% of global annual revenue."
    },
    {
      question: "What is KYC and why is it important?",
      answer: "Know Your Customer (KYC) refers to the process of verifying the identity and assessing the risk profile of clients or customers. It's particularly important in financial services, where it helps prevent identity theft, fraud, money laundering, and terrorist financing. KYC typically involves collecting and verifying identification documents, checking against watchlists, understanding the nature of business relationships, and ongoing monitoring. Strong KYC processes help businesses comply with anti-money laundering (AML) and counter-terrorism financing (CTF) regulations, protect against fraud, and build trust with customers."
    },
    {
      question: "How do I ensure my business is compliant with local tax laws when operating internationally?",
      answer: "For international tax compliance: 1) Research tax obligations in each country where you operate or have customers; 2) Understand permanent establishment rules that determine when you need to register locally; 3) Learn about applicable treaties to avoid double taxation; 4) Consider hiring local tax experts in each significant market; 5) Implement proper documentation systems for cross-border transactions; 6) Stay current with changing regulations; 7) Use international tax compliance software; 8) Consider specialized structures like holding companies if appropriate; and 9) Maintain open communication with relevant tax authorities. Professional guidance is essential for international operations."
    },
  ],
  audit: [
    {
      question: "What is the difference between internal and external audits?",
      answer: "Internal audits are conducted by employees within an organization to evaluate internal controls, risk management, and governance processes. They aim to improve operations and help the organization achieve its objectives. External audits are performed by independent third parties (typically accounting firms) to verify the accuracy of financial statements and ensure compliance with accounting standards. External audits provide an objective assessment and are often required by law for public companies, while internal audits are voluntary but valuable for improving business processes."
    },
    {
      question: "How often should a company be audited?",
      answer: "External financial audits are typically conducted annually for public companies as required by securities regulations. Private companies may choose annual audits for credibility with stakeholders, or less frequent schedules based on requirements from lenders, investors, or industry regulations. Internal audits generally follow a risk-based approach, with high-risk areas audited more frequently (possibly quarterly) and lower-risk areas less often (perhaps every 2-3 years). The appropriate frequency depends on company size, industry, risk profile, regulatory requirements, and available resources."
    },
    {
      question: "What should I expect during an audit?",
      answer: "During an audit, expect: 1) Planning meetings to discuss scope and requirements; 2) Requests for financial records, documentation, policies, and access to key personnel; 3) Testing of transactions, controls, and processes; 4) Questions about business practices and accounting methods; 5) Analysis of financial statements and supporting evidence; 6) Identification of issues requiring adjustment or disclosure; 7) Draft findings discussions; and 8) A final report with an audit opinion and recommendations. The process can take weeks or months depending on organization size and complexity."
    },
    {
      question: "What are the red flags auditors look for?",
      answer: "Auditors commonly look for: unusual transactions near period end; inconsistent revenue recognition; unexpected profitability compared to industry standards; mismatches between financial performance and cash flow; excessive or unexplained write-offs; related party transactions without proper disclosure; outdated inventory; significant accounting estimates without supporting documentation; unexplained adjusting entries; weak internal controls; resistance to providing information; and management override of controls. These red flags don't necessarily indicate fraud but warrant closer examination."
    },
    {
      question: "Is an audit the same as a financial review?",
      answer: "No, an audit provides the highest level of assurance and involves extensive testing, verification of information with third parties, physical inspections, and detailed analysis. A review provides limited assurance and primarily involves analytical procedures and inquiries, without detailed testing or verification. As a result, a review expresses only 'limited assurance' that no material modifications are needed to financial statements, while an audit expresses an opinion on whether statements are fairly presented in all material respects. Reviews are less extensive, less costly, and provide less assurance than audits."
    },
  ],
  advisory: [
    {
      question: "What services do financial advisors typically provide?",
      answer: "Financial advisors typically offer: investment management and portfolio planning; retirement planning; tax planning strategies; estate planning guidance; risk management and insurance needs analysis; cash flow and debt management; education funding strategies; business succession planning; charitable giving strategies; and comprehensive financial planning that integrates all these areas. The specific services vary based on the advisor's qualifications, specialty areas, and client needs. Some advisors focus on investment management while others provide holistic planning across multiple areas."
    },
    {
      question: "How do I choose the right financial advisor?",
      answer: "To select the right financial advisor: 1) Verify credentials (CFP, CFA, etc.) and check for disciplinary history; 2) Understand their fee structure (commission-based, fee-only, or fee-based); 3) Ask about their specialties and typical clients to ensure alignment with your needs; 4) Inquire about their investment philosophy and approach; 5) Request references; 6) Assess communication style and frequency; 7) Understand their fiduciary responsibility; 8) Evaluate the services provided relative to the fees charged; and 9) Trust your comfort level - the relationship should feel right since you'll be sharing sensitive information."
    },
    {
      question: "What's the difference between a CPA, CFP, and CFA?",
      answer: "A CPA (Certified Public Accountant) specializes in accounting, tax preparation, auditing, and general financial compliance. A CFP (Certified Financial Planner) focuses on comprehensive personal financial planning including investments, retirement, tax, and estate planning for individuals. A CFA (Chartered Financial Analyst) specializes in investment analysis, portfolio management, and advanced investment strategies, typically working with institutional investors or high-net-worth clients. CPAs have expertise in tax and accounting accuracy, CFPs excel at holistic personal planning, while CFAs have the deepest expertise in investment analysis and management."
    },
    {
      question: "How do financial advisors charge for their services?",
      answer: "Financial advisors use several fee models: 1) Commission-based (paid when clients buy financial products); 2) Fee-only (paid directly by clients through percentage of assets managed, hourly rates, or flat fees); 3) Fee-based (combination of fees and commissions); 4) Subscription-based (regular monthly or annual fees); 5) Performance-based (fees tied to investment performance above a benchmark); or 6) Retainer arrangements (fixed fee for ongoing service). Each model creates different incentives, with fee-only often considered to have fewer conflicts of interest since compensation isn't tied to specific product sales."
    },
    {
      question: "When should I consult a financial advisor?",
      answer: "Consider consulting a financial advisor during significant life transitions (marriage, divorce, children, inheritance, job change); when planning for major goals like retirement or education funding; if your financial situation becomes complex (business ownership, equity compensation, multiple income sources); when needing specialized tax strategies; if you lack time or interest to manage finances yourself; when concerned about your current financial direction; before making major investment decisions; or when coordinating estate planning. Even those comfortable managing day-to-day finances often benefit from professional guidance during complex situations or for periodic financial reviews."
    },
  ]
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{category: string, questions: typeof faqData.tax}[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results: {category: string, questions: typeof faqData.tax}[] = [];
    
    Object.entries(faqData).forEach(([category, questions]) => {
      const matchedQuestions = questions.filter(
        item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchedQuestions.length > 0) {
        results.push({
          category: category.charAt(0).toUpperCase() + category.slice(1),
          questions: matchedQuestions
        });
      }
    });
    
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Find answers to common questions about accounting, tax, compliance, and financial advisory services.
              </p>
              <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
                <Input
                  type="text"
                  placeholder="Search questions..."
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

        <div className="container mx-auto px-4 py-16">
          {hasSearched && searchTerm ? (
            <div>
              <h2 className="text-2xl font-bold mb-6">Search Results for "{searchTerm}"</h2>
              
              {searchResults.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      No results found. Try different keywords or browse the categories below.
                    </p>
                    <Button 
                      variant="link" 
                      onClick={() => {setSearchTerm(""); setHasSearched(false);}}
                      className="mt-4"
                    >
                      Clear search
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <p className="mb-6 text-muted-foreground">Found {searchResults.reduce((acc, item) => acc + item.questions.length, 0)} results</p>
                  {searchResults.map((result, index) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">{result.category}</h3>
                      <Accordion type="single" collapsible className="mb-4">
                        {result.questions.map((item, qIndex) => (
                          <AccordionItem key={qIndex} value={`search-${index}-${qIndex}`}>
                            <AccordionTrigger className="text-left">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={() => {setSearchTerm(""); setHasSearched(false);}}
                    className="mt-2"
                  >
                    Clear search results
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div>
              <Tabs defaultValue="tax">
                <TabsList className="mb-8 flex justify-center">
                  <TabsTrigger value="tax">Tax</TabsTrigger>
                  <TabsTrigger value="accounting">Accounting</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="audit">Audit</TabsTrigger>
                  <TabsTrigger value="advisory">Advisory</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tax">
                  <h2 className="text-2xl font-bold mb-6">Tax Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.tax.map((item, index) => (
                      <AccordionItem key={index} value={`tax-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="accounting">
                  <h2 className="text-2xl font-bold mb-6">Accounting Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.accounting.map((item, index) => (
                      <AccordionItem key={index} value={`accounting-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="compliance">
                  <h2 className="text-2xl font-bold mb-6">Compliance Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.compliance.map((item, index) => (
                      <AccordionItem key={index} value={`compliance-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="audit">
                  <h2 className="text-2xl font-bold mb-6">Audit Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.audit.map((item, index) => (
                      <AccordionItem key={index} value={`audit-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="advisory">
                  <h2 className="text-2xl font-bold mb-6">Advisory Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.advisory.map((item, index) => (
                      <AccordionItem key={index} value={`advisory-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
        
        {/* Contact CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Our team of experts is ready to help you with any specific questions about your financial situation.
            </p>
            <Button size="lg" asChild className="px-8">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
