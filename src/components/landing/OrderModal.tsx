import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setName("")
      setPhone("")
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            className="relative bg-neutral-950 border border-neutral-800 rounded-2xl p-8 w-full max-w-md"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Оставить заявку</h3>
                <p className="text-neutral-400 mb-8">Перезвоним в течение часа и обсудим ваш проект</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-300">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-600 focus:border-[#FF4D00]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-neutral-300">Телефон</Label>
                    <Input
                      id="phone"
                      placeholder="+7 (900) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-600 focus:border-[#FF4D00]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#FF4D00] hover:bg-[#e04400] text-white border-0 mt-2"
                  >
                    Отправить заявку
                  </Button>
                </form>
              </>
            ) : (
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#FF4D00]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} className="text-[#FF4D00]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
                <p className="text-neutral-400 mb-8">Мы свяжемся с вами в ближайшее время</p>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                >
                  Закрыть
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
