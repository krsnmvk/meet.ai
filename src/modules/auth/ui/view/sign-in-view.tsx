import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import SignInForm from '../components/sign-in-form';
import Link from 'next/link';

export default function SignInView() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid md:grid-cols-2 p-0">
          <SignInForm />
          <div className="bg-radial from-green-700 gap-y-4 hidden to-green-900 md:flex flex-col items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              height={43}
              width={41}
              className="size-24"
            />
            <h3 className="text-2xl font-semibold text-white">Meet.Ai</h3>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>
      </div>
    </div>
  );
}
