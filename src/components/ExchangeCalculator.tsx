import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CryptoRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
  type: 'crypto' | 'fiat';
}

const CRYPTO_ICONS: Record<string, string> = {
  'BTC': '₿',
  'ETH': 'Ξ',
  'USDT': '₮',
  'BNB': 'BNB',
  'SOL': 'SOL',
  'XRP': 'XRP',
  'RUB': '₽'
};

const CRYPTO_NAMES: Record<string, string> = {
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'USDT': 'Tether',
  'BNB': 'BNB',
  'SOL': 'Solana',
  'XRP': 'Ripple',
  'RUB': 'Российский рубль'
};

const API_URL = 'https://functions.poehali.dev/07068487-ac7b-4b88-bdf2-45590efaca18';

export default function ExchangeCalculator() {
  const [fromCrypto, setFromCrypto] = useState('BTC');
  const [toCrypto, setToCrypto] = useState('RUB');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('sbp');
  const [cryptoData, setCryptoData] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    calculateExchange();
  }, [fromCrypto, toCrypto, fromAmount, cryptoData]);

  const fetchRates = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const formattedRates: CryptoRate[] = data.rates.map((rate: any) => ({
        symbol: rate.symbol,
        name: CRYPTO_NAMES[rate.symbol] || rate.symbol,
        price: rate.price,
        change24h: rate.change24h,
        icon: CRYPTO_ICONS[rate.symbol] || rate.symbol,
        type: rate.symbol === 'RUB' ? 'fiat' : 'crypto'
      }));
      
      setCryptoData(formattedRates);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      setLoading(false);
    }
  };

  const calculateExchange = () => {
    if (cryptoData.length === 0) return;
    
    const from = cryptoData.find(c => c.symbol === fromCrypto);
    const to = cryptoData.find(c => c.symbol === toCrypto);
    
    if (from && to && fromAmount) {
      const amount = parseFloat(fromAmount) || 0;
      const result = (amount * from.price) / to.price;
      setToAmount(result.toFixed(toCrypto === 'RUB' ? 2 : 6));
    }
  };

  const swapCryptos = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
    setFromAmount(toAmount);
  };

  return (
    <Card className="glass-card p-8 border-2 border-primary/20">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Калькулятор обмена
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Отдаёте</label>
          <div className="flex gap-3">
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1 bg-background/50 border-primary/30 text-lg"
              placeholder="0.00"
            />
            <Select value={fromCrypto} onValueChange={setFromCrypto}>
              <SelectTrigger className="w-[140px] bg-background/50 border-primary/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptoData.map(crypto => (
                  <SelectItem key={crypto.symbol} value={crypto.symbol}>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{crypto.icon}</span>
                      {crypto.symbol}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={swapCryptos}
            variant="ghost"
            size="icon"
            className="rounded-full gradient-purple hover:scale-110 transition-transform"
          >
            <Icon name="ArrowDownUp" size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Получаете</label>
          <div className="flex gap-3">
            <Input
              type="text"
              value={toAmount}
              readOnly
              className="flex-1 bg-background/50 border-accent/30 text-lg font-semibold"
              placeholder="0.00"
            />
            <Select value={toCrypto} onValueChange={setToCrypto}>
              <SelectTrigger className="w-[140px] bg-background/50 border-accent/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptoData.map(crypto => (
                  <SelectItem key={crypto.symbol} value={crypto.symbol}>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{crypto.icon}</span>
                      {crypto.symbol}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {toCrypto === 'RUB' && (
            <div className="mt-4 p-4 bg-background/30 rounded-lg">
              <label className="text-sm text-muted-foreground mb-3 block">Способ получения</label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg glass-card hover:border-primary/50 transition-all cursor-pointer">
                  <RadioGroupItem value="sbp" id="sbp" />
                  <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    <div>
                      <div className="font-semibold">СБП (Система Быстрых Платежей)</div>
                      <div className="text-xs text-muted-foreground">Мгновенный перевод на карту любого банка</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg glass-card hover:border-primary/50 transition-all cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="CreditCard" size={20} className="text-secondary" />
                    <div>
                      <div className="font-semibold">Банковская карта</div>
                      <div className="text-xs text-muted-foreground">Перевод на карту Visa/MasterCard/Мир</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        <Button className="w-full gradient-purple hover:opacity-90 transition-opacity text-lg py-6 mt-6">
          {toCrypto === 'RUB' ? `Получить на ${paymentMethod === 'sbp' ? 'СБП' : 'карту'}` : 'Обменять'}
          <Icon name="Zap" size={20} className="ml-2" />
        </Button>
      </div>

      <div className="mt-6 p-4 bg-background/30 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Комиссия</span>
          <span className="text-green-400 font-semibold">0.5%</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">Время обработки</span>
          <span className="text-accent font-semibold">~ 5 минут</span>
        </div>
      </div>
    </Card>
  );
}