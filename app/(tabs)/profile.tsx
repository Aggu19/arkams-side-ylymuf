
import { IconSymbol } from "@/components/IconSymbol";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "About This App",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.headerCard}
          >
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol name="heart.fill" color="#FFFFFF" size={60} />
              <Text style={styles.headerTitle}>Made with Love</Text>
              <Text style={styles.headerSubtitle}>by Arkam for Shaeema</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <IconSymbol name="info.circle.fill" color={colors.primary} size={24} />
              <Text style={styles.cardTitle}>About This App</Text>
            </View>
            <Text style={styles.cardText}>
              This app was created by Arkam as a gift of love for Shaeema. 
              It&apos;s designed to help her understand that his love never changes, 
              even during busy or stressful times.
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <IconSymbol name="sparkles" color={colors.primary} size={24} />
              <Text style={styles.cardTitle}>Purpose</Text>
            </View>
            <Text style={styles.cardText}>
              Sometimes work and stress can make it seem like someone is distant or upset. 
              This app helps provide context and reassurance that everything is okay, 
              and that Arkam&apos;s love for Shaeema is constant and unwavering.
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(800).duration(600)}
            style={styles.quoteCard}
          >
            <Text style={styles.arabicQuote}>أنت نور حياتي</Text>
            <Text style={styles.quoteTranslation}>You are the light of my life</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1000).duration(600)}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <IconSymbol name="heart.fill" color={colors.primary} size={24} />
              <Text style={styles.cardTitle}>A Message from Arkam</Text>
            </View>
            <Text style={styles.cardText}>
              Shaeema, you are the most important person in my life. 
              I created this app to show you how much I care, even when I&apos;m busy or stressed. 
              My love for you is endless, and I want you to always remember that. 
              You deserve all the happiness in the world, and I&apos;m grateful every day that you&apos;re in my life. ❤️
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1200).duration(600)}
            style={styles.loveNoteCard}
          >
            <Text style={styles.loveNoteTitle}>Always Remember:</Text>
            <View style={styles.loveNoteItem}>
              <Text style={styles.loveNoteBullet}>💕</Text>
              <Text style={styles.loveNoteText}>You are loved unconditionally</Text>
            </View>
            <View style={styles.loveNoteItem}>
              <Text style={styles.loveNoteBullet}>💕</Text>
              <Text style={styles.loveNoteText}>You are always in my thoughts</Text>
            </View>
            <View style={styles.loveNoteItem}>
              <Text style={styles.loveNoteBullet}>💕</Text>
              <Text style={styles.loveNoteText}>You deserve all the best things in life</Text>
            </View>
            <View style={styles.loveNoteItem}>
              <Text style={styles.loveNoteBullet}>💕</Text>
              <Text style={styles.loveNoteText}>You make every day brighter</Text>
            </View>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Made by Arkam with endless love ❤️</Text>
            <Text style={styles.footerSubtext}>For the most amazing person in the world</Text>
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
    padding: 20,
    paddingBottom: Platform.OS !== 'ios' ? 100 : 40,
  },
  headerCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    boxShadow: '0px 4px 16px rgba(255, 105, 180, 0.4)',
    elevation: 5,
  },
  headerGradient: {
    padding: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(255, 105, 180, 0.2)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 10,
  },
  cardText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  quoteCard: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  arabicQuote: {
    fontSize: 24,
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
  loveNoteCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    boxShadow: '0px 2px 8px rgba(255, 105, 180, 0.2)',
    elevation: 2,
  },
  loveNoteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  loveNoteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loveNoteBullet: {
    fontSize: 18,
    marginRight: 12,
  },
  loveNoteText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    opacity: 0.7,
  },
});
