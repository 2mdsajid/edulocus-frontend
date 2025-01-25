import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { PRODUCT_FEATURES } from "@/lib/data"



export default function ProductFeatures() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-color1">
      <h2 className='text-4xl mb-4 text-center font-extrabold tracking-wider text-gray-700 font-pt-serif'>
        Product Features
      </h2>
      <p className='text-xl text-center font-normal max-w-3xl mx-auto mb-12 text-gray-800'>
        A bundle of various advanced features and many more to come in future..
      </p>
      <div className="space-y-12">
        {PRODUCT_FEATURES.map((feature, index) => (
          <Card key={index} className="overflow-hidden bg-primary">
            <CardContent className="p-0 bg-primary">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="w-full md:w-1/3 lg:1/2">
                  <AspectRatio ratio={feature.x / feature.y}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-2 text-color7">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}