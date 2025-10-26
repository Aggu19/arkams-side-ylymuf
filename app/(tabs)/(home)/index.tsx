
import React from "react";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, View, Text, Pressable, Platform, ScrollView } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";

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
            title: "Understanding Arkam",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <IconSymbol name="heart.fill" color={colors.primary} size={80} />
            </View>
            <Text style={styles.title}>Understanding Arkam</Text>
            <Text style={styles.subtitle}>
              Sometimes things aren&apos;t what they seem. Let&apos;s understand the situation better.
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <Pressable 
              style={styles.mainCard}
              onPress={() => router.push('/questionnaire')}
            >
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                style={styles.gradientCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardIcon}>
                  <IconSymbol name="doc.text.fill" color="#FFFFFF" size={32} />
                </View>
                <Text style={styles.cardTitle}>Start Questionnaire</Text>
                <Text style={styles.cardDescription}>
                  Answer a few questions to get a better perspective
                </Text>
                <View style={styles.arrowContainer}>
                  <IconSymbol name="arrow.right" color="#FFFFFF" size={24} />
                </View>
              </LinearGradient>
            </Pressable>

            <View style={styles.infoCard}>
              <IconSymbol name="info.circle.fill" color={colors.primary} size={24} />
              <Text style={styles.infoText}>
                This app helps you understand situations from a positive perspective. 
                Remember, everyone has busy days and stressful moments.
              </Text>
            </View>
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
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
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
  },
  cardContainer: {
    width: '100%',
  },
  mainCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(106, 90, 205, 0.3)',
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
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 16,
  },
  arrowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginLeft: 12,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
