import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Contacts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Контакты
          </h2>
          <p className="text-muted-foreground text-lg">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Ваше имя
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="bg-background/50 border-primary/30"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-background/50 border-primary/30"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Сообщение
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ваше сообщение..."
                  className="bg-background/50 border-primary/30 min-h-[120px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full gradient-purple hover:opacity-90 transition-opacity">
                Отправить сообщение
                <Icon name="Send" size={18} className="ml-2" />
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card p-6 hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">support@cryptoexchange.com</p>
                  <p className="text-sm text-muted-foreground mt-1">Ответим в течение 1 часа</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover:border-secondary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center flex-shrink-0">
                  <Icon name="MessageCircle" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telegram</h4>
                  <p className="text-muted-foreground">@cryptoexchange_support</p>
                  <p className="text-sm text-muted-foreground mt-1">Онлайн 24/7</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover:border-accent/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-pink flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Режим работы</h4>
                  <p className="text-muted-foreground">Круглосуточно</p>
                  <p className="text-sm text-muted-foreground mt-1">Без выходных и праздников</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 hover:border-primary/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Безопасность</h4>
                  <p className="text-muted-foreground">SSL-шифрование</p>
                  <p className="text-sm text-muted-foreground mt-1">Ваши данные защищены</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
