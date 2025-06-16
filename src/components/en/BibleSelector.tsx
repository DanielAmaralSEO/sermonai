
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { booksOfBible, popularThemes } from '@/utils/en/bibleData';
import { generateSermon, SermonRequest, SermonResponse } from '@/utils/en/openaiService';
import { BookOpen, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BibleSelectorProps {
  onSermonGenerated: (sermon: SermonResponse & { request: SermonRequest }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const BibleSelector: React.FC<BibleSelectorProps> = ({ onSermonGenerated, isLoading, setIsLoading }) => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [verses, setVerses] = useState<string>('');
  const [theme, setTheme] = useState<string>('');
  const { toast } = useToast();

  const selectedBookData = booksOfBible.find(book => book.name === selectedBook);

  const handleGenerateSermon = async () => {
    if (!selectedBook || !chapter) {
      toast({
        title: "Required fields",
        description: "Please select the book and chapter.",
        variant: "destructive"
      });
      return;
    }

    const request: SermonRequest = {
      book: selectedBook,
      chapter: chapter,
      verses: verses || undefined,
      theme: theme || undefined
    };

    setIsLoading(true);
    try {
      const sermon = await generateSermon(request);
      onSermonGenerated({ ...sermon, request });
      toast({
        title: "Sermon generated successfully!",
        description: "Your sermon is ready to impact lives.",
      });
    } catch (error) {
      console.error('Error generating sermon:', error);
      toast({
        title: "Error generating sermon",
        description: "Please try again in a few moments.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto divine-glow border-divine-200">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-divine-gradient rounded-full flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-serif text-sacred-800">
          Structure your sermon with AI
        </CardTitle>
        <p className="text-sacred-600 leading-relaxed">
          Choose the biblical text and receive a complete and structured sermon
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="book" className="text-sacred-700 font-medium">
              Bible Book *
            </Label>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger className="bg-white border-sacred-200 focus:border-divine-400">
                <SelectValue placeholder="Select a book..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-sacred-200 max-h-60">
                <div className="px-2 py-1 text-sm font-medium text-sacred-500 bg-sacred-50">
                  Old Testament
                </div>
                {booksOfBible
                  .filter(book => book.testament === 'old')
                  .map(book => (
                    <SelectItem key={book.name} value={book.name} className="hover:bg-sacred-50">
                      {book.name}
                    </SelectItem>
                  ))}
                <div className="px-2 py-1 text-sm font-medium text-sacred-500 bg-sacred-50 mt-2">
                  New Testament
                </div>
                {booksOfBible
                  .filter(book => book.testament === 'new')
                  .map(book => (
                    <SelectItem key={book.name} value={book.name} className="hover:bg-sacred-50">
                      {book.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chapter" className="text-sacred-700 font-medium">
                Chapter *
              </Label>
              <Input
                id="chapter"
                type="number"
                min="1"
                max={selectedBookData?.chapters || 150}
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="Ex: 3"
                className="bg-white border-sacred-200 focus:border-divine-400"
              />
              {selectedBookData && (
                <p className="text-xs text-sacred-500">
                  Maximum: {selectedBookData.chapters} chapters
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="verses" className="text-sacred-700 font-medium">
                Verses (optional)
              </Label>
              <Input
                id="verses"
                value={verses}
                onChange={(e) => setVerses(e.target.value)}
                placeholder="Ex: 16-17"
                className="bg-white border-sacred-200 focus:border-divine-400"
              />
              <p className="text-xs text-sacred-500">
                Ex: 16 or 16-17 or 16,18
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme" className="text-sacred-700 font-medium flex items-center gap-2">
              <Heart className="w-4 h-4 text-divine-500" />
              Central Theme (optional)
            </Label>
            <div className="space-y-3">
              <Textarea
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Ex: Hope in difficulties, The importance of prayer..."
                className="bg-white border-sacred-200 focus:border-divine-400 min-h-[80px]"
              />
              <div className="space-y-2">
                <p className="text-sm text-sacred-600 font-medium">Popular themes:</p>
                <div className="flex flex-wrap gap-2">
                  {popularThemes.slice(0, 6).map((popularTheme) => (
                    <Button
                      key={popularTheme}
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme(popularTheme)}
                      className="text-xs border-divine-200 text-divine-700 hover:bg-divine-50"
                    >
                      {popularTheme}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerateSermon}
          disabled={isLoading || !selectedBook || !chapter}
          className="w-full bg-divine-gradient hover:opacity-90 text-white font-medium py-6 text-lg shadow-lg transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating sermon...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Sermon
            </div>
          )}
        </Button>

        <p className="text-xs text-sacred-500 text-center leading-relaxed">
          * Required fields. AI will create a complete structure based on the chosen text.
        </p>
      </CardContent>
    </Card>
  );
};

export default BibleSelector;
