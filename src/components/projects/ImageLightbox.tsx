import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
}

const ImageLightbox = ({ images, index, onClose }: ImageLightboxProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (api && typeof index === 'number') {
      api.scrollTo(index);
    }
  }, [api, index]);

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay />
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
        <Carousel opts={{ loop: images.length > 1 }} setApi={setApi}>
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i} className="flex items-center justify-center">
                <img
                  src={src}
                  alt={`Zdjęcie ${i + 1}`}
                  className="max-h-[80vh] w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;