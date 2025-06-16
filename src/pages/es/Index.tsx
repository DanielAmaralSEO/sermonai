
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import BibleSelector from '@/components/es/BibleSelector';
import SermonDisplay from '@/components/es/SermonDisplay';
import SermonHistory from '@/components/es/SermonHistory';
import { SermonResponse, SermonRequest } from '@/utils/es/openaiService';
import { ArrowUp, BookOpen, Sparkles, Users, Globe } from 'lucide-react';

interface SermonWithRequest extends SermonResponse {
  request: SermonRequest;
  timestamp: number;
}

const Index = () => {
  const [currentSermon, setCurrentSermon] = useState<(SermonResponse & { request: SermonRequest }) | null>(null);
  const [sermonHistory, setSermonHistory] = useState<SermonWithRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSelector, setShowSelector] = useState(true);

  const handleSermonGenerated = (sermon: SermonResponse & { request: SermonRequest }) => {
    const sermonWithTimestamp = { ...sermon, timestamp: Date.now() };
    setCurrentSermon(sermon);
    setSermonHistory(prev => [sermonWithTimestamp, ...prev.slice(0, 9)]); // Mantener solo 10 sermones
    setShowSelector(false);
  };

  const handleSelectFromHistory = (sermon: SermonResponse & { request: SermonRequest }) => {
    setCurrentSermon(sermon);
    setShowSelector(false);
  };

  const handleDeleteFromHistory = (index: number) => {
    setSermonHistory(prev => prev.filter((_, i) => i !== index));
  };

  const handleBackToSelector = () => {
    setShowSelector(true);
    setCurrentSermon(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-50 via-white to-divine-50">
      {/* Hero Section */}
      {showSelector && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-divine-gradient opacity-5"></div>
          <div className="relative container mx-auto px-4 py-16 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-sacred-800 leading-tight">
                  Estructura tu sermón con
                  <span className="bg-divine-gradient bg-clip-text text-transparent"> asistencia de IA</span>
                </h1>
                <p className="text-xl md:text-2xl text-sacred-600 leading-relaxed">
                  Elige el texto bíblico y recibe un sermón listo para
                  <span className="font-semibold text-divine-600"> impactar vidas</span>
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-divine-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sacred-800 mb-2">Base Bíblica Sólida</h3>
                  <p className="text-sacred-600 text-sm">
                    Sermones fundamentados en la Palabra, con contexto histórico e interpretación fiel
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-heavenly-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sacred-800 mb-2">Estructura Profesional</h3>
                  <p className="text-sacred-600 text-sm">
                    Introducción, desarrollo, aplicaciones prácticas y conclusión organizados
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sacred-800 mb-2">Aplicación Práctica</h3>
                  <p className="text-sacred-600 text-sm">
                    Orientación clara para aplicar las enseñanzas en la vida diaria
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {showSelector ? (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <BibleSelector
                onSermonGenerated={handleSermonGenerated}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
            <div className="lg:col-span-1">
              <SermonHistory
                sermons={sermonHistory}
                onSelectSermon={handleSelectFromHistory}
                onDeleteSermon={handleDeleteFromHistory}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <Button
                onClick={handleBackToSelector}
                variant="outline"
                className="border-divine-200 text-divine-700 hover:bg-divine-50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Nuevo Sermón
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={scrollToTop}
                  variant="outline"
                  size="sm"
                  className="border-sacred-200 hover:bg-sacred-50"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Volver arriba
                </Button>
              </div>
            </div>

            {/* Sermon Display */}
            {currentSermon && <SermonDisplay sermon={currentSermon} />}
          </div>
        )}
      </div>

      {/* Language Selection */}
      <section className="bg-white py-12 border-t border-sacred-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-divine-600" />
              <h3 className="text-xl font-semibold text-sacred-800">
                Elige tu idioma
              </h3>
            </div>
            <p className="text-sacred-600 mb-8">
              Accede a la aplicación en tu idioma preferido
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-6 py-3 border border-sacred-300 text-sacred-700 font-medium rounded-lg hover:bg-sacred-50 transition-colors"
              >
                🇧🇷 Português
              </a>
              <a
                href="/en"
                className="px-6 py-3 border border-sacred-300 text-sacred-700 font-medium rounded-lg hover:bg-sacred-50 transition-colors"
              >
                🇺🇸 English
              </a>
              <a
                href="/es"
                className="px-6 py-3 bg-divine-gradient text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                🇪🇸 Español
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sacred-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sacred-300">
            "Predica la palabra; insiste a tiempo y fuera de tiempo" - 2 Timoteo 4:2
          </p>
          <p className="text-sm text-sacred-400 mt-2">
            Herramienta desarrollada para ayudar a predicadores en su misión de compartir la Palabra
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
