// components/generate-code-dialog.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy } from "lucide-react";

// Assume this is your action to generate codes on the server
// You'll need to create this function in your actions file (e.g., tests.actions.ts)
// This function should accept testId and limit, and return an array of codes.
import { generateTestCodes } from "@/lib/actions/tests.actions";

interface GenerateCodeDialogProps {
  testId: string;
}

export function GenerateCodeDialog({
  testId,
}: GenerateCodeDialogProps) {
  const { toast } = useToast();
  const [limit, setLimit] = useState<number>(1);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({}); // To manage copy state per code

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedCodes([]); // Clear previous codes
    setCopyStatus({}); // Clear previous copy status

    try {
      const {data, message} = await generateTestCodes(testId, limit);
      if (data) {
        setGeneratedCodes(data);
        toast({
          title: "Codes Generated",
          description: `${data.length} new codes generated successfully.`,
          variant: "success",
        });
      } else {
        toast({
          title: "Generation Failed",
          description: message || "Failed to generate codes.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating codes:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyStatus((prev) => ({ ...prev, [code]: true }));
      toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
      });
      setTimeout(() => {
        setCopyStatus((prev) => ({ ...prev, [code]: false })); // Reset copy status after a short delay
      }, 2000);
    }).catch((err) => {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy Failed",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    });
  };

  // Reset state when dialog closes
  const handleClose = () => {
    setLimit(1);
    setGeneratedCodes([]);
    setIsLoading(false);
    setCopyStatus({});
  };

  return (
    <Dialog onOpenChange={handleClose}>
        <DialogTrigger>Codes</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Test Codes</DialogTitle>
          <DialogDescription>
            Enter the number of unique codes you want to generate for this test.
            These codes can be used to unlock the test.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="limit" className="text-right">
              Number of Codes
            </Label>
            <Input
              id="limit"
              type="number"
              min="1"
              value={limit}
              onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 1))}
              className="col-span-3"
            />
          </div>
          {generatedCodes.length > 0 && (
            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-2">
              <p className="font-medium">Generated Codes:</p>
              {generatedCodes.map((code) => (
                <div key={code} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                  <span className="font-mono text-sm">{code}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(code)}
                    title="Copy code"
                  >
                    <Copy className={`h-4 w-4 ${copyStatus[code] ? 'text-green-500' : ''}`} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Codes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}