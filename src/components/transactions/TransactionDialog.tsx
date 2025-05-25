'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiDollarSign, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Animation variants for dialog content
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// Animation for form fields
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

// Animation for individual form items
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

// Animation for button
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } }
};

// Tab change animation variants removed

export default function TransactionDialog({ open, onOpenChange }: TransactionDialogProps) {
  const [transactionType, setTransactionType] = useState<string>('expense');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    // Handle the transaction creation logic here
    console.log({
      type: transactionType,
      amount: parseFloat(amount),
      description,
      category,
      date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD for submission
    });

    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setTransactionType('expense');
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(new Date());
  };

  // Define categories based on transaction type
  const categoryOptions = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Refund', 'Other'],
    expense: ['Food', 'Housing', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Other'],
    float: ['Loan', 'Borrowing', 'Lending', 'Advance', 'Other'],
  };

  // Get current categories based on selected transaction type
  const currentCategories =
    transactionType === 'income'
      ? categoryOptions.income
      : transactionType === 'expense'
      ? categoryOptions.expense
      : categoryOptions.float;
  
  // Get icon and color for the button based on transaction type
  const getButtonIcon = () => {
    switch (transactionType) {
      case 'income':
        return <FiTrendingUp className="mr-2" />;
      case 'expense':
        return <FiTrendingDown className="mr-2" />;
      case 'float':
        return <FiDollarSign className="mr-2" />;
      default:
        return <FiDollarSign className="mr-2" />;
    }
  };
  
  const getButtonColor = () => {
    switch (transactionType) {
      case 'income':
        return 'bg-green-600 hover:bg-green-700';
      case 'expense':
        return 'bg-red-600 hover:bg-red-700';
      case 'float':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent className='sm:max-w-[425px]'>
            <motion.div
              initial='hidden'
              animate='visible'
              exit='exit'
              variants={fadeIn}
              className='flex flex-col'
            >
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>Create a new transaction. Choose type and fill in the details.</DialogDescription>
              </DialogHeader>

              <Tabs value={transactionType} onValueChange={setTransactionType} className='w-full mt-2'>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <TabsList className='grid grid-cols-3 mb-4'>
                    <TabsTrigger value='expense' className='flex items-center gap-2'>
                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <FiTrendingDown className='text-red-500' />
                      </motion.div>
                      <span>Expense</span>
                    </TabsTrigger>
                    <TabsTrigger value='income' className='flex items-center gap-2'>
                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <FiTrendingUp className='text-green-500' />
                      </motion.div>
                      <span>Income</span>
                    </TabsTrigger>
                    <TabsTrigger value='float' className='flex items-center gap-2'>
                      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                        <FiDollarSign className='text-blue-500' />
                      </motion.div>
                      <span>Float</span>
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

                <div>
                    {/* Common fields for all transaction types */}
                    <motion.div
                      className='space-y-4 py-2'
                      variants={formVariants}
                      initial='hidden'
                      animate='visible'
                    >
                      <motion.div className='space-y-2' variants={itemVariants}>
                        <Label htmlFor='amount'>Amount</Label>
                        <div className='relative'>
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground'>
                            <FiDollarSign />
                          </span>
                          <Input
                            id='amount'
                            type='number'
                            placeholder='0.00'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className='pl-10'
                          />
                        </div>
                      </motion.div>

                      <motion.div className='space-y-2' variants={itemVariants}>
                        <Label htmlFor='category'>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger id='category'>
                            <SelectValue placeholder='Select category' />
                          </SelectTrigger>
                          <SelectContent>
                            <AnimatePresence>
                              {currentCategories.map((cat) => (
                                <motion.div
                                  key={cat}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <SelectItem value={cat.toLowerCase()}>
                                    {cat}
                                  </SelectItem>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div className='space-y-2' variants={itemVariants}>
                        <Label htmlFor='date'>Date</Label>
                        <Input
                          id='date'
                          type='date'
                          value={date.toISOString().split('T')[0]}
                          onChange={(e) => setDate(new Date(e.target.value))}
                        />
                      </motion.div>

                      <motion.div className='space-y-2' variants={itemVariants}>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea
                          id='description'
                          placeholder='Enter transaction details...'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
              </Tabs>

              <DialogFooter className="mt-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant='outline' onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                </motion.div>
                
                <motion.div
                  className={`${getButtonColor()} rounded-md overflow-hidden`}
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  key={transactionType} // This forces re-render and animation on type change
                >
                  <Button type='submit' onClick={handleSubmit} className="flex items-center">
                    {getButtonIcon()}
                    <span>Add {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}</span>
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
