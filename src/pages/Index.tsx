import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ExchangeCalculator from '@/components/ExchangeCalculator';
import CryptoRates from '@/components/CryptoRates';
import Reviews from '@/components/Reviews';
import Contacts from '@/components/Contacts';

export default function Index() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
                <Icon name="Zap" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CryptoExchange
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('exchange')} className="text-sm hover:text-primary transition-colors">
                Обмен
              </button>
              <button onClick={() => scrollToSection('rates')} className="text-sm hover:text-primary transition-colors">
                Курсы
              </button>
              <button onClick={() => scrollToSection('reviews')} className="text-sm hover:text-primary transition-colors">
                Отзывы
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm hover:text-primary transition-colors">
                Контакты
              </button>
              <Button className="gradient-purple hover:opacity-90 transition-opacity">
                Войти
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30">
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Быстро • Надёжно • Выгодно
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Обменивайте
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  криптовалюту
                </span>
                <br />
                мгновенно
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Самые выгодные курсы на рынке. Комиссия всего 0.5%. 
                Обработка за 5 минут. Поддержка 24/7.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gradient-purple hover:opacity-90 transition-opacity text-lg px-8"
                  onClick={() => scrollToSection('exchange')}
                >
                  Начать обмен
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/30 hover:bg-primary/10"
                  onClick={() => scrollToSection('rates')}
                >
                  Смотреть курсы
                </Button>
              </div>

              <div className="flex gap-6 pt-4">
                <div>
                  <div className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">10K+</div>
                  <div className="text-sm text-muted-foreground">Клиентов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-blue bg-clip-text text-transparent">$50M+</div>
                  <div className="text-sm text-muted-foreground">Обменено</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-pink bg-clip-text text-transparent">4.9</div>
                  <div className="text-sm text-muted-foreground">Рейтинг</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-purple opacity-20 blur-3xl animate-float" />
              <div className="relative">
                <ExchangeCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="exchange" className="py-20 px-4 bg-background/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Простой обмен за 3 шага
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-purple flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Выберите валюты</h3>
              <p className="text-sm text-muted-foreground">
                Выберите, что отдаёте и что получаете
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-blue flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Укажите сумму</h3>
              <p className="text-sm text-muted-foreground">
                Введите количество для обмена
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-pink flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Получите крипту</h3>
              <p className="text-sm text-muted-foreground">
                Средства придут через 5 минут
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="rates">
        <CryptoRates />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="contacts">
        <Contacts />
      </section>

      <footer className="py-12 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center">
                  <Icon name="Zap" size={24} />
                </div>
                <span className="text-xl font-bold">CryptoExchange</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Надёжный обмен криптовалюты с лучшими курсами на рынке
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Сервис</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#exchange" className="hover:text-primary transition-colors">Обмен</a></li>
                <li><a href="#rates" className="hover:text-primary transition-colors">Курсы</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@cryptoexchange.com</li>
                <li>@cryptoexchange_support</li>
                <li>24/7 онлайн</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-lg glass-card hover:border-primary/50 transition-all flex items-center justify-center">
                  <Icon name="Send" size={20} />
                </button>
                <button className="w-10 h-10 rounded-lg glass-card hover:border-primary/50 transition-all flex items-center justify-center">
                  <Icon name="Twitter" size={20} />
                </button>
                <button className="w-10 h-10 rounded-lg glass-card hover:border-primary/50 transition-all flex items-center justify-center">
                  <Icon name="Youtube" size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
            © 2024 CryptoExchange. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
