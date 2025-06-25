import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  type Props = {};
  
  const PremiumSuspend = (props: Props) => {
    return (
      <div className="min-h-screen flex items-center justify-center  absolute top-0">
        <Card className="w-full max-w-lg rounded-2xl border border-zinc-200  shadow-xl">
          <CardHeader className="border-b border-zinc-200 pb-4">
            <CardTitle className="text-3xl font-bold text-center text-zinc-800">
              Membership Paused
            </CardTitle>
          </CardHeader>
  
          <CardContent className="pt-6 px-4">
            <p className="text-center text-base text-zinc-700 leading-relaxed">
              <strong>
                We&apos;re currently not accepting membership forms for CEE-UG
              </strong>{" "}
              due to a temporary shortage of human resources.
            </p>
          </CardContent>
  
          <CardFooter className="flex flex-col items-center space-y-4 px-4 pt-6 pb-6 border-t border-zinc-200 text-center">
            <p className="text-sm text-zinc-700 font-medium">
              For updates, join our Telegram channel or message us on Facebook for direct support.
            </p>
  
            <div className="w-full flex flex-col gap-3">
              <a
                href="https://t.me/+ygNs2o0PLXpjNDQ1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-center transition shadow"
              >
                📢 Join our Telegram
              </a>
              <a
                href="https://www.facebook.com/edu.locus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 text-center transition shadow"
              >
                💬 Message us on Facebook
              </a>
            </div>
  
            <a
              href="/privacy"
              className="text-xs text-zinc-500 hover:text-zinc-700 underline underline-offset-4 mt-2"
            >
              Privacy Policy
            </a>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default PremiumSuspend;
  