import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassWater, X, Trash2, Plus, Minus, Check, Receipt, Sparkles, Send } from 'lucide-react';
import { barAudio } from '../../utils/barAudio';

export interface TabItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  qty: number;
  notes?: string;
  type: 'cocktail' | 'spirit' | 'custom' | 'bite';
}

interface BarTabDrawerProps {
  items: TabItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTab: () => void;
}

export default function BarTabDrawer({
  items,
  onUpdateQty,
  onRemoveItem,
  onClearTab,
}: BarTabDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tipPercent, setTipPercent] = useState<number>(20);
  const [bartenderNote, setBartenderNote] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  const totalCount = items.reduce((acc, it) => acc + it.qty, 0);
  const subtotal = items.reduce((acc, it) => acc + it.priceNum * it.qty, 0);
  const tipAmount = (subtotal * tipPercent) / 100;
  const grandTotal = subtotal + tipAmount;

  const handleSendTab = () => {
    barAudio.playGlassToast(0.45);
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClearTab();
      setIsOpen(false);
    }, 3200);
  };

  return (
    <>
      {/* Floating Bottom-Right Tab Pill */}
      {totalCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 20 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-5 py-3.5 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] rounded-full shadow-2xl shadow-black font-semibold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer border-2 border-[#0d0905]"
        >
          <div className="relative">
            <GlassWater className="w-4 h-4 text-[#0d0905]" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#0d0905] text-[#c9973e] text-[9px] rounded-full flex items-center justify-center font-bold font-mono">
              {totalCount}
            </span>
          </div>
          <span>My Hearth Tab: ${subtotal.toFixed(2)}</span>
        </motion.button>
      )}

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#120c07] border-l border-[#3a2816] h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#3a2816]">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#c9973e]" />
                    <h3
                      className="text-2xl font-light text-[#f5f0e8]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      The Hearth Bar Tab
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-[#f5f0e8]/50 hover:text-[#c9973e] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="py-4 space-y-3">
                  {items.length === 0 ? (
                    <div className="text-center py-12 text-xs text-[#f5f0e8]/50 font-light">
                      Your bar tab is empty. Select cocktails, spirits from the vault, or custom drinks to add.
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#0d0905] border border-[#3a2816] rounded-xs flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-[#f5f0e8]">{item.name}</div>
                          <div className="text-[10px] text-[#c9973e] font-mono">{item.price} each</div>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center gap-2 bg-[#18110a] border border-[#3a2816] rounded-xs p-1">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-1 text-[#f5f0e8]/60 hover:text-[#f5f0e8] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-4 text-center text-[#c9973e]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-1 text-[#f5f0e8]/60 hover:text-[#f5f0e8] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="text-right">
                          <div className="font-serif text-[#c9973e] font-medium">
                            ${(item.priceNum * item.qty).toFixed(2)}
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[10px] text-red-400 hover:text-red-300 mt-1 cursor-pointer flex items-center gap-0.5"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bartender Custom Note */}
                {items.length > 0 && (
                  <div className="pt-2">
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-[#c9973e] mb-1.5">
                      Notes for Master Mixologist:
                    </label>
                    <input
                      type="text"
                      value={bartenderNote}
                      onChange={(e) => setBartenderNote(e.target.value)}
                      placeholder="e.g. Extra heavy cherrywood smoke, low ice..."
                      className="w-full bg-[#0d0905] border border-[#3a2816] rounded-xs px-3 py-2 text-xs text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:border-[#c9973e] outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Summary & Send */}
              {items.length > 0 && (
                <div className="pt-4 border-t border-[#3a2816] space-y-4">
                  {/* Tip Selector */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] uppercase font-mono text-[#f5f0e8]/60">
                      <span>Mixologist Gratuity</span>
                      <span className="text-[#c9973e]">${tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[18, 20, 25, 30].map((pct) => (
                        <button
                          key={pct}
                          onClick={() => setTipPercent(pct)}
                          className={`py-1.5 text-xs font-mono rounded-xs border transition-all cursor-pointer ${
                            tipPercent === pct
                              ? 'bg-[#c9973e] text-[#0d0905] border-[#c9973e] font-bold'
                              : 'bg-[#0d0905] border-[#3a2816] text-[#f5f0e8]/70 hover:border-[#c9973e]/40'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1 text-xs text-[#f5f0e8]/75">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalCount} drinks):</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#c9973e]">
                      <span>Hospitality Gratuity ({tipPercent}%):</span>
                      <span className="font-mono">${tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-light text-[#f5f0e8] pt-2 border-t border-[#3a2816]/70">
                      <span>Total:</span>
                      <span
                        className="text-xl text-[#c9973e] italic"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Order Button */}
                  {isOrdered ? (
                    <div className="p-4 bg-[#c9973e]/20 border border-[#c9973e] text-center text-xs text-[#f5f0e8] rounded-xs space-y-1 animate-pulse">
                      <div className="font-semibold text-[#c9973e] flex items-center justify-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Order Received by Bartender!</span>
                      </div>
                      <p className="text-[11px] text-[#f5f0e8]/80 font-light">
                        Your drinks are being smoked and shaken at the Walnut Bar.
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleSendTab}
                      className="w-full py-4 bg-[#c9973e] hover:bg-[#d8a84e] text-[#0d0905] font-semibold text-xs tracking-[0.2em] uppercase rounded-xs transition-all shadow-xl shadow-[#c9973e]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Order to Hearth Bartender (${grandTotal.toFixed(2)})</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
