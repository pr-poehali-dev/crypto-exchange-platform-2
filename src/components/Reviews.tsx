import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  initials: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Алексей Петров',
    rating: 5,
    date: '2 дня назад',
    text: 'Отличный сервис! Обмен прошёл быстро, курс очень выгодный. Буду пользоваться ещё.',
    initials: 'АП'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    rating: 5,
    date: '5 дней назад',
    text: 'Всё прошло гладко, средства пришли через 3 минуты. Поддержка отзывчивая.',
    initials: 'МИ'
  },
  {
    id: 3,
    name: 'Дмитрий Козлов',
    rating: 4,
    date: 'неделю назад',
    text: 'Хороший обменник, только комиссия могла быть чуть ниже. В целом доволен.',
    initials: 'ДК'
  },
  {
    id: 4,
    name: 'Елена Смирнова',
    rating: 5,
    date: '2 недели назад',
    text: 'Пользуюсь уже месяц, ни разу не подвели. Рекомендую всем своим друзьям!',
    initials: 'ЕС'
  },
  {
    id: 5,
    name: 'Игорь Волков',
    rating: 5,
    date: '3 недели назад',
    text: 'Интуитивный интерфейс, быстрые транзакции. Лучший обменник из тех, что пробовал.',
    initials: 'ИВ'
  },
  {
    id: 6,
    name: 'Анна Новикова',
    rating: 4,
    date: 'месяц назад',
    text: 'Всё работает отлично. Единственное - хотелось бы больше криптовалют в списке.',
    initials: 'АН'
  }
];

export default function Reviews() {
  return (
    <div className="py-20 bg-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Отзывы клиентов
          </h2>
          <p className="text-muted-foreground text-lg">
            Более 10,000 довольных пользователей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="glass-card p-6 hover:border-secondary/50 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 gradient-blue">
                  <AvatarFallback className="bg-transparent text-white font-semibold">
                    {review.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-foreground/90">
                {review.text}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="glass-card p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <div className="text-sm text-muted-foreground">Пользователей</div>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-blue bg-clip-text text-transparent mb-2">
              $50M+
            </div>
            <div className="text-sm text-muted-foreground">Обменено</div>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-pink bg-clip-text text-transparent mb-2">
              4.9
            </div>
            <div className="text-sm text-muted-foreground">Рейтинг</div>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <div className="text-3xl font-bold gradient-purple bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">Поддержка</div>
          </div>
        </div>
      </div>
    </div>
  );
}
