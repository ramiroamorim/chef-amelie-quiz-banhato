
import { Card, CardContent } from "@/components/ui-essentials/card";
import { Button } from "@/components/ui-essentials/button";

export default function ThankYou() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDF8F5] p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6 text-center">
          <h1 className="text-3xl font-bold text-[#A85544] mb-6">
            Merci pour votre achat!
          </h1>
          
          <p className="text-lg mb-8">
            Votre accès aux 500 recettes va être envoyé par email dans quelques minutes.
          </p>

          <div className="bg-[#FDF1F1] p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Prochaines étapes:</h2>
            <ol className="text-left space-y-4">
              <li>1. Vérifiez votre boîte de réception</li>
              <li>2. Cliquez sur le lien de téléchargement dans l'email</li>
              <li>3. Commencez à profiter de vos nouvelles recettes!</li>
            </ol>
          </div>

          <p className="text-sm text-gray-600">
            Questions? Contactez-nous à support@chefameliedupont.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
