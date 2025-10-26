
import React from "react";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View, Text, Pressable, Platform, ScrollView } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log("Settings pressed")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="gear" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "For Shaeema",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInUp.delay(200).duration(800)}
            style={styles.heroSection}
          >
            <View style={styles.iconContainer}>
              <IconSymbol name="heart.fill" color={colors.primary} size={80} />
            </View>
            <Text style={styles.title}>Understanding Arkam</Text>
            <Text style={styles.subtitle}>
              Made with love by Arkam for Shaeema ❤️
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(400).duration(800)}
            style={styles.arabicQuoteContainer}
          >
            <Text style={styles.arabicQuote}>الحب هو أجمل شعور</Text>
            <Text style={styles.quoteTranslation}>Love is the most beautiful feeling</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(600).duration(800)}
            style={styles.cardContainer}
          >
            <Pressable 
              style={styles.mainCard}
              onPress={() => router.push('/questionnaire')}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
                style={styles.gradientCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardIcon}>
                  <IconSymbol name="doc.text.fill" color="#FFFFFF" size={32} />
                </View>
                <Text style={styles.cardTitle}>Start Questionnaire</Text>
                <Text style={styles.cardDescription}>
                  Answer a few questions to understand the situation better
                </Text>
                <View style={styles.arrowContainer}>
                  <IconSymbol name="arrow.right" color="#FFFFFF" size={24} />
                </View>
              </LinearGradient>
            </Pressable>

            <Animated.View 
              entering={FadeInDown.delay(800).duration(800)}
              style={styles.infoCard}
            >
              <IconSymbol name="sparkles" color={colors.primary} size={24} />
              <Text style={styles.infoText}>
                This app was created by Arkam to help Shaeema understand that his love never changes, 
                even during busy or stressful times. You deserve all the love in the world! 💕
              </Text>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(1000).duration(800)}
              style={styles.loveCard}
            >
              <Text style={styles.loveCardTitle}>Remember:</Text>
              <Text style={styles.loveCardText}>
                - Arkam loves you more than anything{'\n'}
                - He&apos;s always thinking of you{'\n'}
                - His busy moments don&apos;t mean less love{'\n'}
                - You are his everything ❤️
              </Text>
            </Animated.View>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Made by Arkam with endless love</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS !== 'ios' ? 100 : 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  arabicQuoteContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 2px 12px rgba(255, 105, 180, 0.2)',
    elevation: 3,
  },
  arabicQuote: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'System',
  },
  quoteTranslation: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cardContainer: {
    width: '100%',
  },
  mainCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(255, 105, 180, 0.4)',
    elevation: 5,
  },
  gradientCard: {
    padding: 24,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
    marginBottom: 16,
  },
  arrowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 2px 8px rgba(255, 105, 180, 0.2)',
    elevation: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginLeft: 12,
  },
  loveCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
    boxShadow: '0px 2px 8px rgba(255, 105, 180, 0.2)',
    elevation: 2,
  },
  loveCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  loveCardText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    opacity: 0.7,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
