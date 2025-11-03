import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';

const generateChartData = (basePrice: number, days: number) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const variance = (Math.random() - 0.5) * basePrice * 0.05;
    currentPrice = Math.max(basePrice * 0.85, Math.min(basePrice * 1.15, currentPrice + variance));
    
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: i === 0 ? 'Сейчас' : date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      price: parseFloat(currentPrice.toFixed(2)),
    });
  }
  
  return data;
};

interface CryptoCurrency {
  symbol: string;
  name: string;
  price: number;
  icon: string;
  color: string;
}

const CRYPTO_ICONS: Record<string, string> = {
  'BTC': '₿',
  'ETH': 'Ξ',
  'BNB': 'BNB',
  'SOL': 'SOL'
};

const CRYPTO_NAMES: Record<string, string> = {
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'BNB': 'BNB',
  'SOL': 'Solana'
};

const CRYPTO_COLORS: Record<string, string> = {
  'BTC': '#8B5CF6',
  'ETH': '#0EA5E9',
  'BNB': '#D946EF',
  'SOL': '#F97316'
};

const API_URL = 'https://functions.poehali.dev/07068487-ac7b-4b88-bdf2-45590efaca18';

export default function CryptoChart() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [period, setPeriod] = useState<'7' | '30' | '90'>('7');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const formattedCryptos: CryptoCurrency[] = data.rates
        .filter((rate: any) => ['BTC', 'ETH', 'BNB', 'SOL'].includes(rate.symbol))
        .map((rate: any) => ({
          symbol: rate.symbol,
          name: CRYPTO_NAMES[rate.symbol] || rate.symbol,
          price: rate.price,
          icon: CRYPTO_ICONS[rate.symbol] || rate.symbol,
          color: CRYPTO_COLORS[rate.symbol] || '#8B5CF6'
        }));
      
      setCryptos(formattedCryptos);
      if (formattedCryptos.length > 0) {
        setSelectedCrypto(formattedCryptos[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      setLoading(false);
    }
  };

  if (loading || !selectedCrypto) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-muted-foreground">Загрузка графика...</div>
        </div>
      </div>
    );
  }

  const chartData = generateChartData(
    selectedCrypto.price,
    period === '7' ? 7 : period === '30' ? 30 : 90
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-primary/30">
          <p className="text-sm text-muted-foreground">{payload[0].payload.date}</p>
          <p className="text-lg font-bold">${payload[0].value.toLocaleString('en-US')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            График курсов
          </h2>
          <p className="text-muted-foreground text-lg">
            Динамика изменения цен криптовалют
          </p>
        </div>

        <Card className="glass-card p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {cryptos.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => setSelectedCrypto(crypto)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCrypto.symbol === crypto.symbol
                    ? 'gradient-purple scale-105'
                    : 'glass-card hover:border-primary/50'
                }`}
              >
                <span className="text-lg mr-2">{crypto.icon}</span>
                <span className="font-semibold">{crypto.symbol}</span>
              </button>
            ))}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-1">
                ${selectedCrypto.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h3>
              <p className="text-muted-foreground">{selectedCrypto.name}</p>
            </div>

            <Tabs value={period} onValueChange={(v) => setPeriod(v as '7' | '30' | '90')}>
              <TabsList className="glass-card">
                <TabsTrigger value="7">7Д</TabsTrigger>
                <TabsTrigger value="30">30Д</TabsTrigger>
                <TabsTrigger value="90">90Д</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedCrypto.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={selectedCrypto.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={selectedCrypto.color}
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Макс. за период</p>
              <p className="text-lg font-bold text-green-400">
                ${Math.max(...chartData.map(d => d.price)).toLocaleString()}
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Мин. за период</p>
              <p className="text-lg font-bold text-red-400">
                ${Math.min(...chartData.map(d => d.price)).toLocaleString()}
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Средняя цена</p>
              <p className="text-lg font-bold text-accent">
                ${(chartData.reduce((a, b) => a + b.price, 0) / chartData.length).toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Волатильность</p>
              <p className="text-lg font-bold text-primary">
                {((Math.max(...chartData.map(d => d.price)) - Math.min(...chartData.map(d => d.price))) / selectedCrypto.price * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}