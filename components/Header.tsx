import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars'
import { BlurView } from 'expo-blur'

export const Header = () => {
    const [currDate, setCurrDate] = useState<Date>(new Date())
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    const changeDate = (direction: 'forward' | 'backward') => {
        const newDate = new Date(currDate)

        if (direction === 'forward') {
            newDate.setDate(newDate.getDate() + 1)
        } else {
            newDate.setDate(newDate.getDate() - 1)
        }

        setCurrDate(newDate)
    }

    const handleDateSelection = (date) => {
        const selectedDate = new Date(date)
        setCurrDate(selectedDate)
        setIsCalendarOpen(false) // Close the calendar after selection
    }

    return (
        <>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => changeDate('backward')}>
                        <View style={styles.chevron}>
                            <FontAwesome
                                name="chevron-left"
                                size={24}
                                color="#000"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                        <Text style={styles.date}>{formatDate(currDate)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeDate('forward')}>
                        <View style={styles.chevron}>
                            <FontAwesome
                                name="chevron-right"
                                size={24}
                                color="#000"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.underline} />
            </View>

            {isCalendarOpen && (
                <BlurView
                    style={styles.blurBackground}
                    intensity={25} // Set higher intensity for better effect
                />
            )}

            {isCalendarOpen && (
                <View style={styles.calendarContainer}>
                    <Calendar
                        current={currDate.toISOString()}
                        onDayPress={(day) => {
                            handleDateSelection(day.dateString + 'T00:00:00')
                            console.log(day)
                        }}
                        markedDates={{
                            [currDate.toISOString().split('T')[0]]: {
                                selected: true
                            }
                        }}
                        style={styles.calendar}
                    />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chevron: {
        padding: 20 // Want to increase the touchable area for the chevron
    },
    date: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    underline: {
        backgroundColor: '#000',
        height: 2
    },
    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    calendarContainer: {
        position: 'absolute',
        top: 100, // Adjust position as needed
        left: 20,
        right: 20,
        zIndex: 1 // Put calendar above the blur view
    },
    calendar: {
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden'
    }
})
