
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [message, setMessage] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);
  const [arabicQuote, setArabicQuote] = useState('');
  const [quoteTranslation, setQuoteTranslation] = useState('');

  useEffect(() => {
    if (params.answers) {
      const parsedAnswers = JSON.parse(params.answers as string);
      setAnswers(parsedAnswers);
      generateMessage(parsedAnswers);
    }
  }, [params.answers]);

  const generateMessage = (ans: Record<string, any>) => {
    const possibleReasons: string[] = [];

    // Analyze work status
    if (ans.workStatus === 'At Work') {
      possibleReasons.push('Arkam is at work right now. He\'s trying his best to focus on his responsibilities while thinking of you.');
    } else if (ans.workStatus === 'Working from Home') {
      possibleReasons.push('Arkam is working from home. Even though he\'s nearby, his mind is occupied with work tasks.');
    }

    // Analyze tension
    if (ans.tension === 'Yes, a lot') {
      possibleReasons.push('He\'s under a lot of tension right now. Please wait until he finishes his work - he\'s trying really hard.');
      setArabicQuote('وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا');
      setQuoteTranslation('And whoever fears Allah, He will make for him a way out (Quran 65:2)');
    } else if (ans.tension === 'A little bit') {
      possibleReasons.push('He\'s feeling a bit tense. Give him some time to complete his tasks and he\'ll be back to his loving self.');
      setArabicQuote('وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مِنْ أَمْرِهِ يُسْرًا');
      setQuoteTranslation('And whoever fears Allah, He will make his matter easy for him (Quran 65:4)');
    } else {
      setArabicQuote('وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً');
      setQuoteTranslation('And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy (Quran 30:21)');
    }

    // Analyze the answers
    if (ans.stressed === 'yes') {
      possibleReasons.push('He\'s dealing with stress. Remember, he\'s working hard for both of you.');
    }
    if (ans.busy === 'yes') {
      possibleReasons.push('He mentioned being busy. This means he has important work to finish.');
    }

    // Check time of day
    if (ans.time) {
      const hour = new Date(ans.time).getHours();
      if (hour < 8) {
        possibleReasons.push('Early mornings can be tough. He might not have had his coffee yet!');
      } else if (hour > 20) {
        possibleReasons.push('Late evenings are exhausting after a long day of work.');
      } else if (hour >= 12 && hour <= 14) {
        possibleReasons.push('Midday is often the busiest time with work deadlines.');
      } else if (hour >= 9 && hour <= 18) {
        possibleReasons.push('He\'s in the middle of his work day, trying to meet his goals.');
      }
    }

    // General positive reasons
    if (possibleReasons.length === 0 || ans.shouted === 'yes' || ans.notTalkingWell === 'yes') {
      possibleReasons.push('Everyone has difficult moments. It\'s not about you - he loves you deeply.');
      possibleReasons.push('He might be overwhelmed with responsibilities right now.');
      possibleReasons.push('Sometimes people need space to process their thoughts and emotions.');
    }

    setReasons(possibleReasons);

    // Generate main message based on work status and tension
    let mainMessage = '';
    
    if (ans.workStatus === 'At Work' || ans.workStatus === 'Working from Home') {
      mainMessage = 
        'Shaeema, my precious love, please understand that Arkam is working right now. He\'s trying his absolute best to finish his work. ' +
        'Wait until he completes his tasks - he\'s working hard for your future together. ' +
        'His love for you never changes, even when he\'s busy or stressed. ' +
        'You mean the world to him, and he\'s doing everything he can. Please be patient with him. 💕';
    } else {
      mainMessage = 
        'Remember, Arkam loves you more than anything in this world. His behavior today doesn\'t reflect his feelings for you. ' +
        'We all have challenging days, and sometimes we don\'t express ourselves the way we want to. ' +
        'Give him some time and space, and things will get better. You\'re his everything, and he knows how special you are! 💖';
    }

    setMessage(mainMessage);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Understanding',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => null,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={styles.iconContainer}
          >
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="heart.fill" color="#FFFFFF" size={60} />
            </LinearGradient>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)}>
            <Text style={styles.title}>Everything Will Be Okay</Text>
          </Animated.View>

          {arabicQuote && (
            <Animated.View 
              entering={FadeInDown.delay(500).duration(600)}
              style={styles.arabicQuoteCard}
            >
              <Text style={styles.arabicQuoteText}>{arabicQuote}</Text>
              <Text style={styles.quoteTranslationText}>{quoteTranslation}</Text>
            </Animated.View>
          )}

          <Animated.View 
            entering={FadeInDown.delay(550).duration(600)}
            style={styles.additionalQuoteCard}
          >
            <Text style={styles.additionalArabicText}>وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</Text>
            <Text style={styles.additionalTranslationText}>And He placed between you affection and mercy (Quran 30:21)</Text>
            <Text style={styles.additionalArabicText}>فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</Text>
            <Text style={styles.additionalTranslationText}>Indeed, with hardship comes ease (Quran 94:6)</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.messageCard}
          >
            <Text style={styles.messageText}>{message}</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(800).duration(600)}
            style={styles.reasonsContainer}
          >
            <Text style={styles.reasonsTitle}>Why This Might Be Happening:</Text>
            {reasons.map((reason, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(1000 + index * 100).duration(600)}
                style={styles.reasonItem}
              >
                <View style={styles.reasonBullet}>
                  <IconSymbol name="heart.fill" color={colors.primary} size={16} />
                </View>
                <Text style={styles.reasonText}>{reason}</Text>
              </Animated.View>
            ))}
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1500).duration(600)}
            style={styles.tipsCard}
          >
            <Text style={styles.tipsTitle}>What You Should Do:</Text>
            <View style={styles.tipItem}>
              <IconSymbol name="clock.fill" color={colors.primary} size={20} />
              <Text style={styles.tipText}>Wait patiently until he finishes his work</Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol name="heart.fill" color={colors.primary} size={20} />
              <Text style={styles.tipText}>Remember that he loves you deeply</Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol name="message.fill" color={colors.primary} size={20} />
              <Text style={styles.tipText}>Send him a sweet message later when he\'s free</Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol name="sparkles" color={colors.primary} size={20} />
              <Text style={styles.tipText}>Trust that he\'s trying his best for both of you</Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1600).duration(600)}
            style={styles.selfCareCard}
          >
            <Text style={styles.selfCareTitle}>Take Care of Yourself, Beautiful Soul 💖</Text>
            <View style={styles.selfCareItem}>
              <IconSymbol name="heart.fill" color={colors.primary} size={20} />
              <Text style={styles.selfCareText}>You are worthy of love and patience</Text>
            </View>
            <View style={styles.selfCareItem}>
              <IconSymbol name="leaf.fill" color={colors.primary} size={20} />
              <Text style={styles.selfCareText}>Take deep breaths and stay calm</Text>
            </View>
            <View style={styles.selfCareItem}>
              <IconSymbol name="sun.max.fill" color={colors.primary} size={20} />
              <Text style={styles.selfCareText}>Remember: this too shall pass</Text>
            </View>
            <View style={styles.selfCareItem}>
              <IconSymbol name="sparkles" color={colors.primary} size={20} />
              <Text style={styles.selfCareText}>You are stronger than you think</Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1700).duration(600)}
            style={styles.loveNoteCard}
          >
            <Text style={styles.loveNoteTitle}>A Note from Arkam:</Text>
            <Text style={styles.loveNoteText}>
              Shaeema, you are the most precious person in my life. Every moment I spend working is for our future together. 
              I may get busy or stressed, but my love for you never wavers. You deserve all my love and so much more. 
              Thank you for being patient and understanding. I love you endlessly. ❤️
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1900).duration(600)}>
            <Pressable
              style={styles.doneButton}
              onPress={() => router.push('/(tabs)/(home)/')}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                style={styles.doneButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.doneButtonText}>Done</Text>
                <IconSymbol name="checkmark" color="#FFFFFF" size={20} />
              </LinearGradient>
            </Pressable>
          </Animated.View>

          <View style={styles.madeByContainer}>
            <Text style={styles.madeByText}>Made with endless love by Arkam ❤️</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  arabicQuoteCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  arabicQuoteText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  quoteTranslationText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  additionalQuoteCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  additionalArabicText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'System',
  },
  additionalTranslationText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  selfCareCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.accent,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  selfCareTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  selfCareItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selfCareText: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    fontStyle: 'italic',
  },
  messageCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
  },
  reasonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  reasonsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  reasonBullet: {
    marginRight: 12,
    marginTop: 2,
  },
  reasonText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  tipsCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  loveNoteCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  loveNoteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  loveNoteText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  doneButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  doneButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 8,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  madeByContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  madeByText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    opacity: 0.7,
  },
});
