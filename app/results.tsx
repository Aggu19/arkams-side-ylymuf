
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

  useEffect(() => {
    if (params.answers) {
      const parsedAnswers = JSON.parse(params.answers as string);
      setAnswers(parsedAnswers);
      generateMessage(parsedAnswers);
    }
  }, [params.answers]);

  const generateMessage = (ans: Record<string, any>) => {
    const possibleReasons: string[] = [];

    // Analyze the answers
    if (ans.stressed === 'yes') {
      possibleReasons.push('He might be dealing with stress from work or personal matters');
    }
    if (ans.busy === 'yes') {
      possibleReasons.push('He mentioned being busy, which means he has a lot on his plate');
    }
    if (ans.weather === 'Rainy' || ans.weather === 'Stormy' || ans.weather === 'Cold') {
      possibleReasons.push('The weather can affect mood and energy levels');
    }

    // Check time of day
    if (ans.time) {
      const hour = new Date(ans.time).getHours();
      if (hour < 8) {
        possibleReasons.push('Early mornings can be tough, especially if he didn&apos;t sleep well');
      } else if (hour > 20) {
        possibleReasons.push('Late evenings can be exhausting after a long day');
      } else if (hour >= 12 && hour <= 14) {
        possibleReasons.push('Lunchtime can be hectic with work deadlines');
      }
    }

    // General positive reasons
    if (possibleReasons.length === 0 || ans.shouted === 'yes' || ans.notTalkingWell === 'yes') {
      possibleReasons.push('Everyone has difficult moments, and it&apos;s not about you');
      possibleReasons.push('He might be overwhelmed with responsibilities');
      possibleReasons.push('Sometimes people need space to process their thoughts');
    }

    setReasons(possibleReasons);

    // Generate main message
    const mainMessage = 
      'Remember, Arkam loves you very much. His behavior today doesn&apos;t reflect his feelings for you. ' +
      'We all have challenging days, and sometimes we don&apos;t express ourselves the way we want to. ' +
      'Give him some time and space, and things will get better. You&apos;re amazing, and he knows it! 💜';

    setMessage(mainMessage);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Understanding',
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
              colors={[colors.primary, colors.secondary]}
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
            <Text style={styles.reasonsTitle}>Possible Reasons:</Text>
            {reasons.map((reason, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(1000 + index * 100).duration(600)}
                style={styles.reasonItem}
              >
                <View style={styles.reasonBullet}>
                  <IconSymbol name="checkmark.circle.fill" color={colors.primary} size={20} />
                </View>
                <Text style={styles.reasonText}>{reason}</Text>
              </Animated.View>
            ))}
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1500).duration(600)}
            style={styles.tipsCard}
          >
            <Text style={styles.tipsTitle}>What You Can Do:</Text>
            <View style={styles.tipItem}>
              <IconSymbol name="message.fill" color={colors.secondary} size={20} />
              <Text style={styles.tipText}>Send him a sweet message later</Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol name="clock.fill" color={colors.secondary} size={20} />
              <Text style={styles.tipText}>Give him some time and space</Text>
            </View>
            <View style={styles.tipItem}>
              <IconSymbol name="heart.fill" color={colors.secondary} size={20} />
              <Text style={styles.tipText}>Remember that he cares about you</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1700).duration(600)}>
            <Pressable
              style={styles.doneButton}
              onPress={() => router.push('/(tabs)/(home)/')}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.doneButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.doneButtonText}>Done</Text>
                <IconSymbol name="checkmark" color="#FFFFFF" size={20} />
              </LinearGradient>
            </Pressable>
          </Animated.View>
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
    boxShadow: '0px 4px 16px rgba(106, 90, 205, 0.3)',
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  messageCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
    elevation: 3,
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
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
  doneButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(106, 90, 205, 0.3)',
    elevation: 4,
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
});
