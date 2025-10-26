
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "About",
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <IconSymbol name="heart.circle.fill" color={colors.primary} size={80} />
            </View>
            <Text style={styles.title}>About This App</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Purpose</Text>
            <Text style={styles.cardText}>
              This app is designed to help you understand situations from a positive perspective. 
              Sometimes when people we care about seem distant or upset, it&apos;s not about us - 
              they might be dealing with their own challenges.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>How It Works</Text>
            <Text style={styles.cardText}>
              Answer a few simple questions about the situation, and the app will provide you with 
              possible explanations and positive perspectives. Remember, everyone has difficult days, 
              and understanding this can help maintain healthy relationships.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Remember</Text>
            <Text style={styles.cardText}>
              Communication is key in any relationship. While this app provides perspective, 
              it&apos;s always best to talk openly with your loved ones when you&apos;re ready.
            </Text>
          </View>

          <View style={styles.footer}>
            <IconSymbol name="sparkles" color={colors.secondary} size={24} />
            <Text style={styles.footerText}>Made with love 💜</Text>
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
    paddingBottom: Platform.OS !== 'ios' ? 100 : 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
    fontWeight: '600',
  },
});
