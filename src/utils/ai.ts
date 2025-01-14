// AI utility functions for task enhancement
    export function generateTaskSuggestions(existingTasks: string[]): string[] {
      const suggestions = {
        professional: [
          'تحديد الأهداف المهنية للأسبوع القادم 🎯',
          'مراجعة المشاريع الحالية 💼 وتحديد الخطوات التالية',
          'تطوير مهارة جديدة 💻 في مجال عملك',
          'بناء علاقات مهنية جديدة 🤝',
          'تحضير عرض تقديمي 🎤 لمشروع قادم',
        ],
        educational: [
          'قراءة فصل من كتاب 📚 في مجال تطوير الذات',
          'مشاهدة محاضرة تعليمية 🎓 عبر الإنترنت',
          'حل تمارين أو مسائل 📝 في مادة دراسية',
          'البحث عن معلومات 🔍 حول موضوع يثير اهتمامك',
          'مراجعة ملاحظاتك 📒 من الدورات التدريبية السابقة',
        ],
        health: [
          'ممارسة تمارين رياضية 🏋️ لمدة 45 دقيقة',
          'تحضير وجبة صحية 🥗 ومتوازنة',
          'الحصول على قسط كافٍ من النوم 😴',
          'ممارسة تمارين التأمل 🧘 لمدة 15 دقيقة',
          'شرب كمية كافية من الماء 💧 خلال اليوم',
        ],
        family: [
          'قضاء وقت ممتع مع العائلة 👨‍👩‍👧‍👦',
          'تحضير وجبة عشاء 🍽️ مع العائلة',
          'ممارسة نشاط ترفيهي 🎭 مع أفراد العائلة',
          'التحدث مع أفراد العائلة 💬 والاستماع إليهم',
          'مساعدة أحد أفراد العائلة في مهمة ما',
        ],
        social: [
          'التواصل مع صديق قديم 📞',
          'الخروج مع الأصدقاء 🚶‍♀️ في مكان جديد',
          'المشاركة في نشاط اجتماعي 🥳',
          'تقديم المساعدة لشخص محتاج 🤝',
          'التعرف على أشخاص جدد 🙋‍♀️ في مجتمعك',
        ],
        financial: [
          'مراجعة المصروفات الشهرية 💰 وتحديد أوجه الإنفاق',
          'تحديد أهداف مالية 🎯 قصيرة وطويلة الأجل',
          'البحث عن فرص استثمارية 📈 جديدة',
          'تخصيص جزء من الدخل للتوفير 🏦',
          'مراجعة الفواتير 🧾 وتقليل النفقات غير الضرورية',
        ],
        personal: [
          'ممارسة هواية مفضلة 🎨 أو نشاط ترفيهي',
          'تخصيص وقت للاسترخاء 😌 والتأمل',
          'كتابة يومياتك ✍️ وتدوين أفكارك',
          'الاستماع إلى موسيقى 🎶 هادئة',
          'القيام بنشاط إبداعي 💡 جديد',
        ],
        spiritual: [
          'قراءة جزء من القرآن الكريم 📖 أو كتاب ديني',
          'أداء الصلاة في وقتها 🕌',
          'تخصيص وقت للدعاء 🤲 والتضرع إلى الله',
          'التأمل في خلق الله 🌌',
          'الاستماع إلى تلاوة خاشعة 🎧',
        ],
      };
      
      const allSuggestions = Object.values(suggestions).flat();
      return allSuggestions.filter(suggestion => 
        !existingTasks.some(task => 
          task.toLowerCase().includes(suggestion.toLowerCase())
        )
      );
    }

    export function predictPriority(title: string, description: string): 'high' | 'medium' | 'low' {
      const urgentKeywords = ['عاجل', 'مهم', 'ضروري', 'اليوم', 'حالاً', 'فوري', 'طارئ', 'لا يمكن تأجيله'];
      const mediumKeywords = ['أسبوع', 'قريباً', 'متابعة', 'لاحقاً', 'خلال أيام', 'في أقرب وقت', 'ممكن'];
      const lowKeywords = ['عند الإمكان', 'غير مستعجل', 'في وقت لاحق', 'إذا سمح الوقت', 'غير ضروري'];
      
      const text = `${title} ${description}`.toLowerCase();
      
      if (urgentKeywords.some(keyword => text.includes(keyword))) {
        return 'high';
      }
      if (mediumKeywords.some(keyword => text.includes(keyword))) {
        return 'medium';
      }
      if (lowKeywords.some(keyword => text.includes(keyword))) {
        return 'low';
      }
      
      // If no specific keywords, prioritize based on length and complexity
      if (title.length > 40 || description.length > 100) {
        return 'medium';
      }
      if (title.split(' ').length > 5 || description.split(' ').length > 15) {
        return 'medium';
      }
      return 'low';
    }
