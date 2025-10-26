
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeInUp,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const heartScale = useSharedValue(1);

  useEffect(() => {
    heartScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      false
    );

    const timer = setTimeout(() => {
      router.replace('/(tabs)/(home)/');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Animated.View 
          entering={FadeIn.delay(200).duration(1000)}
          style={[styles.heartContainer, heartAnimatedStyle]}
        >
          <IconSymbol name="heart.fill" color="#FFFFFF" size={100} />
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(800).duration(800)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Made with Love</Text>
          <Text style={styles.subtitle}>by Arkam</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(1400).duration(800)}
          style={styles.messageContainer}
        >
          <Text style={styles.message}>For Shaeema</Text>
          <Text style={styles.subMessage}>The love of my life</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(2000).duration(800)}
          style={styles.quoteContainer}
        >
          <Text style={styles.arabicQuote}>الحب هو الحياة</Text>
          <Text style={styles.quoteTranslation}>Love is Life</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(2600).duration(800)}
          style={styles.finalMessage}
        >
          <Text style={styles.finalText}>You deserve all my love</Text>
          <Text style={styles.finalText}>and so much more ❤️</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(3200).duration(800)}
          style={styles.footer}
        >
          <Text style={styles.footerText}>Made by Arkam</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  heartContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.95,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  message: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  arabicQuote: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  quoteTranslation: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.85,
    fontStyle: 'italic',
  },
  finalMessage: {
    alignItems: 'center',
    marginBottom: 40,
  },
  finalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
  },
});
