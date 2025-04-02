import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { Lightbulb, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export interface StockTermDefinition {
  term: string;
  shortDefinition: string;
  longDefinition: string;
  example?: string;
  keyTakeaway?: string;
}

interface StockTermExplainerProps {
  term: string;
  definitions: Record<string, StockTermDefinition>;
  className?: string;
  iconOnly?: boolean;
}

export const StockTermExplainer: React.FC<StockTermExplainerProps> = ({
  term,
  definitions,
  className,
  iconOnly = false
}) => {
  if (!definitions[term]) {
    return <span className={className}>{term}</span>;
  }

  const definition = definitions[term];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "p-0 h-auto inline-flex items-center gap-1 text-inherit hover:bg-transparent hover:text-teal-400 focus:ring-0",
            className
          )}
        >
          {!iconOnly && <span>{term}</span>}
          <HelpCircle className="w-4 h-4 text-teal-400/70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="bg-zinc-900 border-teal-500/20 text-white p-4 max-w-md"
        sideOffset={5}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h4 className="font-medium text-teal-400">{definition.term}</h4>
          </div>
          
          <p className="text-sm text-gray-300">{definition.longDefinition}</p>
          
          {definition.example && (
            <div className="p-2 bg-teal-950/30 rounded-md border border-teal-500/20">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-teal-400">Example: </span>
                {definition.example}
              </p>
            </div>
          )}
          
          {definition.keyTakeaway && (
            <div className="mt-2">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-teal-400">Key takeaway: </span>
                {definition.keyTakeaway}
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
