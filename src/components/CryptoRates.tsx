import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CryptoRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  marketCap: string;
}

const cryptoRates: CryptoRate[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 94250.50, change24h: 2.4, icon: '₿', marketCap: '$1.85T' },
  { symbol: 'ETH', name: 'Ethereum', price: 3420.75, change24h: -1.2, icon: 'Ξ', marketCap: '$411B' },
  { symbol: 'USDT', name: 'Tether', price: 1.00, change24h: 0.01, icon: '₮', marketCap: '$97B' },
  { symbol: 'BNB', name: 'BNB', price: 612.30, change24h: 3.1, icon: 'BNB', marketCap: '$89B' },
  { symbol: 'SOL', name: 'Solana', price: 189.45, change24h: 5.7, icon: 'SOL', marketCap: '$86B' },
  { symbol: 'XRP', name: 'Ripple', price: 0.62, change24h: -0.8, icon: 'XRP', marketCap: '$35B' },
];

export default function CryptoRates() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Актуальные курсы
          </h2>
          <p className="text-muted-foreground text-lg">
            Обновляются каждые 30 секунд
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cryptoRates.map((crypto) => (
            <Card
              key={crypto.symbol}
              className="glass-card p-6 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center text-2xl">
                    {crypto.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{crypto.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{crypto.name}</p>
                  </div>
                </div>
                <Icon 
                  name={crypto.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
                  className={crypto.change24h >= 0 ? "text-green-400" : "text-red-400"}
                  size={24}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold">
                    ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`text-sm font-semibold ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Капитализация</span>
                  <span className="font-semibold text-accent">{crypto.marketCap}</span>
                </div>
              </div>

              <div className="mt-4 h-1 bg-background/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${crypto.change24h >= 0 ? 'gradient-purple' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(crypto.change24h) * 10, 100)}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
