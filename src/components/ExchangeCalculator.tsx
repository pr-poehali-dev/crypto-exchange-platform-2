import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CryptoRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

const cryptoData: CryptoRate[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 94250.50, change24h: 2.4, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 3420.75, change24h: -1.2, icon: 'Ξ' },
  { symbol: 'USDT', name: 'Tether', price: 1.00, change24h: 0.01, icon: '₮' },
  { symbol: 'BNB', name: 'BNB', price: 612.30, change24h: 3.1, icon: 'BNB' },
  { symbol: 'SOL', name: 'Solana', price: 189.45, change24h: 5.7, icon: 'SOL' },
  { symbol: 'XRP', name: 'Ripple', price: 0.62, change24h: -0.8, icon: 'XRP' },
];

export default function ExchangeCalculator() {
  const [fromCrypto, setFromCrypto] = useState('BTC');
  const [toCrypto, setToCrypto] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');

  useEffect(() => {
    calculateExchange();
  }, [fromCrypto, toCrypto, fromAmount]);

  const calculateExchange = () => {
    const from = cryptoData.find(c => c.symbol === fromCrypto);
    const to = cryptoData.find(c => c.symbol === toCrypto);
    
    if (from && to && fromAmount) {
      const amount = parseFloat(fromAmount) || 0;
      const result = (amount * from.price) / to.price;
      setToAmount(result.toFixed(6));
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
        </div>

        <Button className="w-full gradient-purple hover:opacity-90 transition-opacity text-lg py-6 mt-6">
          Обменять
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
