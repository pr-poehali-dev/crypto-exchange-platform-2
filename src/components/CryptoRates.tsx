import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

interface CryptoRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  marketCap: string;
}

const CRYPTO_ICONS: Record<string, string> = {
  'BTC': '₿',
  'ETH': 'Ξ',
  'USDT': '₮',
  'BNB': 'BNB',
  'SOL': 'SOL',
  'XRP': 'XRP'
};

const CRYPTO_NAMES: Record<string, string> = {
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'USDT': 'Tether',
  'BNB': 'BNB',
  'SOL': 'Solana',
  'XRP': 'Ripple'
};

const API_URL = 'https://functions.poehali.dev/07068487-ac7b-4b88-bdf2-45590efaca18';

const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(0)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value.toFixed(0)}`;
};

export default function CryptoRates() {
  const [cryptoRates, setCryptoRates] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const formattedRates: CryptoRate[] = data.rates
        .filter((rate: any) => rate.symbol !== 'RUB')
        .map((rate: any) => ({
          symbol: rate.symbol,
          name: CRYPTO_NAMES[rate.symbol] || rate.symbol,
          price: rate.price,
          change24h: rate.change24h,
          icon: CRYPTO_ICONS[rate.symbol] || rate.symbol,
          marketCap: formatMarketCap(rate.marketCap)
        }));
      
      setCryptoRates(formattedRates);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-muted-foreground">Загрузка курсов...</div>
        </div>
      </div>
    );
  }

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