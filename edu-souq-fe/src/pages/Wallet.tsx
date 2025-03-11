import React from 'react';
import { useAuthStore } from '../store/authStore';
import { CreditCard, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';

const TRANSACTION_HISTORY = [
  {
    id: 1,
    type: 'earned',
    amount: 50,
    description: 'Completed Arabic Basics Course',
    date: '2024-03-15'
  },
  {
    id: 2,
    type: 'spent',
    amount: 25,
    description: 'Enrolled in Moroccan Cuisine Course',
    date: '2024-03-14'
  },
  {
    id: 3,
    type: 'earned',
    amount: 30,
    description: 'Teaching Session: Intro to Calligraphy',
    date: '2024-03-12'
  }
];

export default function Wallet() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Balance</h2>
            <p className="text-4xl font-bold text-[#4A90E2]">{user?.tokens} SQtokens</p>
          </div>
          <div className="p-3 bg-[#4A90E2]/10 rounded-full">
            <CreditCard className="text-[#4A90E2]" size={24} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <ArrowUpRight className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">Earn Tokens</h3>
            <p className="text-sm text-gray-600">Teach, complete courses, or participate</p>
          </div>
        </button>
        <button className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <ArrowDownRight className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">Spend Tokens</h3>
            <p className="text-sm text-gray-600">Enroll in courses or book sessions</p>
          </div>
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <History className="text-[#4A90E2]" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
        </div>
        <div className="space-y-4">
          {TRANSACTION_HISTORY.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'earned' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {transaction.type === 'earned' ? (
                    <ArrowUpRight className="text-green-600" size={18} />
                  ) : (
                    <ArrowDownRight className="text-blue-600" size={18} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'earned' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} SQtokens
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}