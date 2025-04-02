import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Button } from "./button";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "./input";
import { stockTermDefinitions } from "../../data/stockTermDefinitions";

export const BeginnerHelpDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTerms = Object.keys(stockTermDefinitions).filter(term => 
    term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stockTermDefinitions[term].shortDefinition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setOpen(true)}
        className="bg-black/50 text-teal-400 border-teal-500/20 hover:bg-teal-950/30 hover:text-teal-300"
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        Need Help Understanding Terms?
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border-teal-500/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-teal-400">Stock Market Terms Explained</DialogTitle>
            <DialogDescription className="text-gray-300">
              Get beginner-friendly explanations for technical terms and indicators.
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for a term..."
              className="pl-8 bg-black/50 border-teal-500/20 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {filteredTerms.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No terms found. Try a different search.</p>
            ) : (
              filteredTerms.map(term => (
                <div key={term} className="p-3 bg-black/50 rounded-lg border border-teal-500/20">
                  <h3 className="text-teal-400 font-medium mb-1">{stockTermDefinitions[term].term}</h3>
                  <p className="text-sm text-gray-300 mb-2">{stockTermDefinitions[term].longDefinition}</p>
                  
                  {stockTermDefinitions[term].example && (
                    <div className="p-2 bg-teal-950/30 rounded-md border border-teal-500/20 mb-2">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium text-teal-400">Example: </span>
                        {stockTermDefinitions[term].example}
                      </p>
                    </div>
                  )}
                  
                  {stockTermDefinitions[term].keyTakeaway && (
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-teal-400">Key takeaway: </span>
                      {stockTermDefinitions[term].keyTakeaway}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
