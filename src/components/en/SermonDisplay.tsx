
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SermonResponse, SermonRequest } from '@/utils/en/openaiService';
import { BookOpen, Copy, Download, Quote, Target, Lightbulb, Heart, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SermonDisplayProps {
  sermon: SermonResponse & { request: SermonRequest };
}

const SermonDisplay: React.FC<SermonDisplayProps> = ({ sermon }) => {
  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    const sermonText = `
SERMON: ${sermon.mainMessage.title}
Based on: ${sermon.keyVerse.reference}
${sermon.request.theme ? `Theme: ${sermon.request.theme}` : ''}

INTRODUCTION:
${sermon.introduction}

KEY VERSE:
"${sermon.keyVerse.text}"
${sermon.keyVerse.reference}

DEVELOPMENT:
${sermon.mainMessage.points.map((point, index) => `${index + 1}. ${point}`).join('\n')}

PRACTICAL APPLICATIONS:
${sermon.practicalApplications.map((app, index) => `• ${app}`).join('\n')}

CONCLUSION:
${sermon.conclusion}

MEMORABLE POINTS:
${sermon.memorablePoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}

ILLUSTRATIONS:
${sermon.illustrations.map((ill, index) => `${index + 1}. ${ill}`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(sermonText);
      toast({
        title: "Copied!",
        description: "Sermon copied to clipboard.",
      });
    } catch (error) {
      console.error('Error copying:', error);
      toast({
        title: "Error copying",
        description: "Try selecting and copying manually.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Feature in development",
      description: "PDF download will be available soon.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header with sermon information */}
      <Card className="heavenly-glow border-heavenly-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-heavenly-gradient rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-serif text-sacred-800">
              {sermon.mainMessage.title}
            </CardTitle>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-heavenly-50 text-heavenly-700 border-heavenly-200">
                {sermon.request.book} {sermon.request.chapter}
                {sermon.request.verses && `:${sermon.request.verses}`}
              </Badge>
              {sermon.request.theme && (
                <Badge variant="secondary" className="bg-divine-50 text-divine-700 border-divine-200">
                  {sermon.request.theme}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              size="sm"
              className="border-sacred-200 hover:bg-sacred-50"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              size="sm"
              className="border-sacred-200 hover:bg-sacred-50"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key verse */}
      <Card className="divine-glow">
        <CardContent className="p-6">
          <div className="scripture-quote">
            <Quote className="w-6 h-6 text-divine-500 mb-3" />
            <p className="text-lg font-serif text-sacred-800 leading-relaxed mb-3">
              {sermon.keyVerse.text}
            </p>
            <p className="text-divine-600 font-medium text-right">
              {sermon.keyVerse.reference}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sacred-800">
            <BookOpen className="w-5 h-5 text-divine-500" />
            Introduction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sacred-700 leading-relaxed">
            {sermon.introduction}
          </p>
        </CardContent>
      </Card>

      {/* Development */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sacred-800">
            <Target className="w-5 h-5 text-heavenly-500" />
            Message Development
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sermon.mainMessage.points.map((point, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-heavenly-100 rounded-full flex items-center justify-center">
                <span className="text-heavenly-700 font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-sacred-700 leading-relaxed pt-1">
                {point}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Practical Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sacred-800">
            <Heart className="w-5 h-5 text-red-500" />
            Practical Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sermon.practicalApplications.map((application, index) => (
            <div key={index} className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sacred-700 leading-relaxed">
                {application}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Illustrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sacred-800">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Illustrations and Analogies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sermon.illustrations.map((illustration, index) => (
            <div key={index} className="bg-sacred-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sacred-700 leading-relaxed italic">
                {illustration}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sacred-800">
            <Quote className="w-5 h-5 text-divine-500" />
            Conclusion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sacred-700 leading-relaxed">
            {sermon.conclusion}
          </p>
        </CardContent>
      </Card>

      {/* Memorable Points */}
      <Card className="divine-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sacred-800">
            <Target className="w-5 h-5 text-divine-500" />
            Memorable Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {sermon.memorablePoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-divine-50 rounded-lg">
                <div className="w-6 h-6 bg-divine-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sacred-800 font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SermonDisplay;
