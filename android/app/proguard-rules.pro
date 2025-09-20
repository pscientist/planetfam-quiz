# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Add any project specific keep options here:

# CL from CahtGPT - Keep React Native & Hermes essentials
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.** { *; }
-keep class com.facebook.soloader.** { *; }
-dontwarn com.facebook.**
-dontwarn javax.annotation.**
-dontwarn kotlinx.coroutines.**
-keep class kotlin.** { *; }
-keep class okhttp3.** { *; }
-keep class okio.** { *; }
-dontwarn okio.**
-dontwarn okhttp3.**
