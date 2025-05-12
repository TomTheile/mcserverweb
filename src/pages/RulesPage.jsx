
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ShieldBan } from 'lucide-react';

const rulesData = [
  { 
    category: "General Conduct", 
    icon: <CheckCircle className="h-6 w-6 text-green-400 mr-3" />,
    rules: [
      "Be respectful to all players and staff members.",
      "No offensive language, hate speech, or discrimination.",
      "Do not spam chat or use excessive caps.",
      "Impersonating staff or other players is forbidden.",
      "Keep discussions in appropriate channels (e.g., Discord)."
    ] 
  },
  { 
    category: "Gameplay Rules", 
    icon: <ShieldBan className="h-6 w-6 text-red-400 mr-3" />,
    rules: [
      "No cheating, hacking, or using exploits (e.g., X-Ray, duping).",
      "Griefing and raiding are not allowed unless in designated PvP zones (if any).",
      "Do not build excessively laggy machines or farms.",
      "Respect player claims; do not build within or too close to others without permission.",
      "AFK farming methods must not bypass server mechanics or cause lag."
    ]
  },
  { 
    category: "Chat & Communication", 
    icon: <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />,
    rules: [
      "English is the primary language in public chat for moderation purposes.",
      "Do not advertise other servers or websites.",
      "Avoid political or religious discussions that may cause conflict.",
      "Sharing personal information of others is strictly prohibited."
    ]
  }
];

const RulesPage = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="minecraft-header text-center mb-12"
        >
          Server Rules
        </motion.h1>

        <div className="max-w-4xl mx-auto space-y-12">
          {rulesData.map((categoryItem, catIndex) => (
            <motion.div 
              key={categoryItem.category}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.2 }}
              className="minecraft-card p-6"
            >
              <h2 className="minecraft-font text-2xl text-white mb-6 flex items-center">
                {categoryItem.icon}
                {categoryItem.category}
              </h2>
              <ul className="space-y-3 list-inside list-disc text-gray-300">
                {categoryItem.rules.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className="pl-2">{rule}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: rulesData.length * 0.2 + 0.3, duration: 0.5 }}
          className="mt-16 text-center text-gray-400"
        >
          <p className="mb-2">
            These rules are in place to ensure a fun and fair environment for everyone.
          </p>
          <p className="mb-2">
            Failure to comply with these rules may result in warnings, mutes, temporary bans, or permanent bans, depending on the severity and frequency of the offense.
          </p>
          <p>
            Staff decisions are final. If you have questions, please contact a staff member politely.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RulesPage;
