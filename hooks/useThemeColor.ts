import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors'; // ✅ named import

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  // 🔐 Defensive fallback to avoid crashing
  return colorFromProps ?? Colors[theme]?.[colorName] ?? '#000';
}
