
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';

interface Question {
  id: string;
  question: string;
  type: 'yesno' | 'datetime' | 'workstatus' | 'tension';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 'date',
    question: 'What is today&apos;s date?',
    type: 'datetime',
  },
  {
    id: 'time',
    question: 'What time did this happen?',
    type: 'datetime',
  },
  {
    id: 'workStatus',
    question: 'Is Arkam at work or working from home?',
    type: 'workstatus',
    options: ['At Work', 'Working from Home', 'Not Working'],
  },
  {
    id: 'tension',
    question: 'Does Arkam seem to be under tension?',
    type: 'tension',
    options: ['Yes, a lot', 'A little bit', 'Not really'],
  },
  {
    id: 'shouted',
    question: 'Did Arkam shout at you?',
    type: 'yesno',
  },
  {
    id: 'notTalkingWell',
    question: 'Was Arkam not talking nicely?',
    type: 'yesno',
  },
  {
    id: 'distant',
    question: 'Was Arkam being distant?',
    type: 'yesno',
  },
  {
    id: 'stressed',
    question: 'Did Arkam seem stressed?',
    type: 'yesno',
  },
  {
    id: 'busy',
    question: 'Did Arkam mention being busy?',
    type: 'yesno',
  },
];

export default function QuestionnaireScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: any) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push({
        pathname: '/results',
        params: { answers: JSON.stringify(newAnswers) },
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      router.back();
    }
  };

  const renderDateTimePicker = () => {
    const isDate = currentQuestion.id === 'date';
    const currentValue = answers[currentQuestion.id] || new Date();

    return (
      <View style={styles.dateTimeContainer}>
        <Pressable
          style={styles.dateTimeButton}
          onPress={() => {
            if (isDate) {
              setShowDatePicker(true);
            } else {
              setShowTimePicker(true);
            }
          }}
        >
          <IconSymbol 
            name={isDate ? 'calendar' : 'clock.fill'} 
            color={colors.primary} 
            size={24} 
          />
          <Text style={styles.dateTimeButtonText}>
            {answers[currentQuestion.id]
              ? isDate
                ? new Date(answers[currentQuestion.id]).toLocaleDateString()
                : new Date(answers[currentQuestion.id]).toLocaleTimeString()
              : isDate
              ? 'Select Date'
              : 'Select Time'}
          </Text>
        </Pressable>

        {(showDatePicker || showTimePicker) && (
          <DateTimePicker
            value={currentValue}
            mode={isDate ? 'date' : 'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              if (Platform.OS === 'android') {
                setShowDatePicker(false);
                setShowTimePicker(false);
              }
              if (selectedDate) {
                handleAnswer(selectedDate.toISOString());
              }
            }}
          />
        )}

        {Platform.OS === 'ios' && (showDatePicker || showTimePicker) && (
          <Pressable
            style={styles.confirmButton}
            onPress={() => {
              setShowDatePicker(false);
              setShowTimePicker(false);
              if (!answers[currentQuestion.id]) {
                handleAnswer(new Date().toISOString());
              }
            }}
          >
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              style={styles.confirmButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </LinearGradient>
          </Pressable>
        )}
      </View>
    );
  };

  const renderOptions = () => (
    <View style={styles.optionsContainer}>
      {currentQuestion.options?.map((option) => (
        <Pressable
          key={option}
          style={[
            styles.optionButton,
            answers[currentQuestion.id] === option && styles.optionButtonSelected,
          ]}
          onPress={() => handleAnswer(option)}
        >
          <Text
            style={[
              styles.optionButtonText,
              answers[currentQuestion.id] === option && styles.optionButtonTextSelected,
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const renderYesNoOptions = () => (
    <View style={styles.yesNoContainer}>
      <Pressable
        style={[styles.yesNoButton, styles.yesButton]}
        onPress={() => handleAnswer('yes')}
      >
        <IconSymbol name="checkmark.circle.fill" color="#FFFFFF" size={32} />
        <Text style={styles.yesNoButtonText}>Yes</Text>
      </Pressable>

      <Pressable
        style={[styles.yesNoButton, styles.noButton]}
        onPress={() => handleAnswer('no')}
      >
        <IconSymbol name="xmark.circle.fill" color="#FFFFFF" size={32} />
        <Text style={styles.yesNoButtonText}>No</Text>
      </Pressable>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Understanding Arkam',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={handleBack} style={styles.headerButton}>
              <IconSymbol name="chevron.left" color={colors.primary} size={24} />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
          style={styles.progressBarContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </LinearGradient>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          <View style={styles.answerContainer}>
            {currentQuestion.type === 'datetime' && renderDateTimePicker()}
            {(currentQuestion.type === 'workstatus' || currentQuestion.type === 'tension') && renderOptions()}
            {currentQuestion.type === 'yesno' && renderYesNoOptions()}
          </View>

          <View style={styles.madeByContainer}>
            <Text style={styles.madeByText}>Made with ❤️ by Arkam</Text>
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
  progressBarContainer: {
    height: 6,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  questionContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  questionNumber: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 36,
  },
  answerContainer: {
    flex: 1,
  },
  dateTimeContainer: {
    alignItems: 'center',
  },
  dateTimeButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxShadow: '0px 2px 8px rgba(255, 105, 180, 0.2)',
    elevation: 2,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  dateTimeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  confirmButton: {
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(255, 105, 180, 0.3)',
    elevation: 4,
  },
  confirmButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(255, 105, 180, 0.2)',
    elevation: 2,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.gradient1,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  optionButtonTextSelected: {
    color: '#FFFFFF',
  },
  yesNoContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  yesNoButton: {
    flex: 1,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  yesButton: {
    backgroundColor: '#4CAF50',
  },
  noButton: {
    backgroundColor: colors.primary,
  },
  yesNoButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
  },
  headerButton: {
    padding: 8,
  },
  madeByContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  madeByText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    opacity: 0.7,
  },
});
