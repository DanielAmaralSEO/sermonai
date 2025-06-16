
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SermonResponse, SermonRequest } from '@/utils/en/openaiService';
import { Clock, BookOpen, Eye, Trash2 } from 'lucide-react';

interface SermonHistoryProps {
  sermons: (SermonResponse & { request: SermonRequest; timestamp: number })[];
  onSelectSermon: (sermon: SermonResponse & { request: SermonRequest }) => void;
  onDeleteSermon: (index: number) => void;
}

const SermonHistory: React.FC<SermonHistoryProps> = ({ sermons, onSelectSermon, onDeleteSermon }) => {
  if (sermons.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg text-sacred-600">
            Sermon History
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Clock className="w-12 h-12 text-sacred-300 mx-auto mb-3" />
          <p className="text-sacred-500">
            No sermons generated yet.
          </p>
          <p className="text-sm text-sacred-400 mt-2">
            Your sermons will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sacred-800">
          <Clock className="w-5 h-5 text-divine-500" />
          History ({sermons.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {sermons.map((sermon, index) => (
          <div key={index} className="group border border-sacred-200 rounded-lg p-3 hover:bg-sacred-50 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sacred-800 text-sm truncate">
                  {sermon.mainMessage.title}
                </h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" className="text-xs border-heavenly-200 text-heavenly-700">
                    {sermon.request.book} {sermon.request.chapter}
                    {sermon.request.verses && `:${sermon.request.verses}`}
                  </Badge>
                  {sermon.request.theme && (
                    <Badge variant="outline" className="text-xs border-divine-200 text-divine-700">
                      {sermon.request.theme.length > 15 
                        ? `${sermon.request.theme.substring(0, 15)}...` 
                        : sermon.request.theme}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onSelectSermon(sermon)}
                  className="h-8 w-8 p-0 hover:bg-heavenly-100"
                >
                  <Eye className="w-4 h-4 text-heavenly-600" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteSermon(index)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-sacred-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimestamp(sermon.timestamp)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SermonHistory;
