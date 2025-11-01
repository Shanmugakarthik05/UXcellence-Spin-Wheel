import { useState } from 'react';
import { Question } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2, CheckCircle, Library } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface QuestionBankProps {
  questions: Question[];
  currentRound: number;
  onAddQuestion: (question: string, description: string, round: number) => void;
  onDeleteQuestion: (questionId: string) => void;
  onActivateQuestions: (questionIds: string[]) => void;
}

const ROUND_NAMES = {
  1: 'Style Battle',
  2: 'Design Remix',
  3: 'UXcellence Grand Showdown'
};

export function QuestionBank({
  questions,
  currentRound,
  onAddQuestion,
  onDeleteQuestion,
  onActivateQuestions,
}: QuestionBankProps) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [selectedRoundForAdd, setSelectedRoundForAdd] = useState<number>(currentRound);
  const [viewingRound, setViewingRound] = useState<number>(currentRound);

  // Filter questions for viewing round
  const bankQuestions = questions.filter(q => q.round === viewingRound && !q.isActive);
  const activeQuestions = questions.filter(q => q.round === viewingRound && q.isActive);

  const handleAddQuestion = () => {
    if (newQuestion.trim() && newDescription.trim()) {
      onAddQuestion(newQuestion.trim(), newDescription.trim(), selectedRoundForAdd);
      setNewQuestion('');
      setNewDescription('');
      setIsAddQuestionOpen(false);
      toast.success(`Question added to ${ROUND_NAMES[selectedRoundForAdd as keyof typeof ROUND_NAMES]} bank successfully!`);
    }
  };

  const handleToggleQuestionSelection = (questionId: string) => {
    setSelectedQuestionIds(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAllQuestions = () => {
    if (selectedQuestionIds.length === bankQuestions.length) {
      setSelectedQuestionIds([]);
    } else {
      setSelectedQuestionIds(bankQuestions.map(q => q.id));
    }
  };

  const handleActivateSelected = () => {
    if (selectedQuestionIds.length === 0) {
      toast.error('Please select at least one question to activate');
      return;
    }
    
    onActivateQuestions(selectedQuestionIds);
    setSelectedQuestionIds([]);
    toast.success(`${selectedQuestionIds.length} question(s) activated for the spin wheel!`);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Library className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Question Bank - Organize by Round
              </CardTitle>
              <CardDescription>
                Add questions to your library for each round and activate them for the spin wheel
              </CardDescription>
            </div>
            <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Bank
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Question to Bank</DialogTitle>
                  <DialogDescription>
                    Add a question to the bank for a specific round. You can activate it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="round-select">Select Round</Label>
                    <Select 
                      value={selectedRoundForAdd.toString()} 
                      onValueChange={(value) => setSelectedRoundForAdd(parseInt(value))}
                    >
                      <SelectTrigger id="round-select">
                        <SelectValue placeholder="Select a round" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Round 1: Style Battle</SelectItem>
                        <SelectItem value="2">Round 2: Design Remix</SelectItem>
                        <SelectItem value="3">Round 3: UXcellence Grand Showdown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      placeholder="Enter the question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter detailed description..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddQuestion} className="w-full">
                    Add to {ROUND_NAMES[selectedRoundForAdd as keyof typeof ROUND_NAMES]}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Round Tabs */}
          <Tabs value={viewingRound.toString()} onValueChange={(value) => {
            setViewingRound(parseInt(value));
            setSelectedQuestionIds([]); // Clear selection when switching rounds
          }}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">
                <div className="flex flex-col items-center">
                  <span>Round 1</span>
                  <span className="text-xs">Style Battle</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="2">
                <div className="flex flex-col items-center">
                  <span>Round 2</span>
                  <span className="text-xs">Design Remix</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="3">
                <div className="flex flex-col items-center">
                  <span>Round 3</span>
                  <span className="text-xs">Grand Showdown</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={viewingRound.toString()} className="space-y-6 mt-6">
              {/* Current Round Indicator */}
              {viewingRound === currentRound && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/30 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    ⚡ This is the current active round
                  </p>
                </div>
              )}

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-950/30">
                  <p className="text-sm text-muted-foreground">In Bank</p>
                  <p className="text-2xl">{bankQuestions.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg dark:bg-green-950/30">
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl">{activeQuestions.length}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-950/30">
                  <p className="text-sm text-muted-foreground">Selected</p>
                  <p className="text-2xl">{selectedQuestionIds.length}</p>
                </div>
              </div>

              {/* Selection Controls */}
              {bankQuestions.length > 0 && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg dark:bg-slate-900 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        id={`select-all-bank-${viewingRound}`}
                        checked={selectedQuestionIds.length === bankQuestions.length && bankQuestions.length > 0}
                        onCheckedChange={handleSelectAllQuestions}
                      />
                      <Label htmlFor={`select-all-bank-${viewingRound}`} className="cursor-pointer">
                        Select All ({selectedQuestionIds.length} of {bankQuestions.length} selected)
                      </Label>
                    </div>
                    <Button
                      onClick={handleActivateSelected}
                      disabled={selectedQuestionIds.length === 0}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate Selected ({selectedQuestionIds.length})
                    </Button>
                  </div>
                </div>
              )}

              {/* Question Bank Table */}
              <div>
                <h3 className="mb-2">Questions in Bank</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedQuestionIds.includes(question.id)}
                        onCheckedChange={() => handleToggleQuestionSelection(question.id)}
                      />
                    </TableCell>
                    <TableCell className="max-w-xs">
                      {question.question}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {question.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          onDeleteQuestion(question.id);
                          setSelectedQuestionIds(prev => prev.filter(id => id !== question.id));
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {bankQuestions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No questions in bank for Round {viewingRound}. Add questions using the "Add to Bank" button above.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
              </div>

              {/* Active Questions Table */}
              <div className="pt-4 border-t">
                <h3 className="mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Active Questions (Available in Spin Wheel)
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeQuestions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell className="max-w-xs">
                          {question.question}
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {question.description}
                          </p>
                        </TableCell>
                        <TableCell>
                          {question.isLocked ? (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
                              Assigned
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                              Available
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {activeQuestions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No active questions for Round {viewingRound}. Select questions from the bank above and click "Activate Selected".
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
