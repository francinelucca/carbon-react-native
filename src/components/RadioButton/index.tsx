import React from 'react';
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { defaultText } from '../../constants/defaultText';
import { createIcon, styleReferenceBreaker } from '../../helpers';
import { getColor } from '../../styles/colors';
import { Text } from '../Text';
import RadioButtonIcon from '@carbon/icons/es/radio-button/20';
import RadioButtonCheckedIcon from '@carbon/icons/es/radio-button--checked/20';

export type RadioButtonProps = {
  /** Text to render */
  label: string;
  /** ID of item (any identifier to identify the checkbox) */
  id: string;
  /** Indicate if checked */
  checked: boolean;
  /** Indicate if disabled */
  disabled?: boolean;
  /** Indicate if label should be hidden (label is used for accessibility even when hidden)  */
  hideLabel?: boolean;
  /** onPress event returns the current value and ID of the item */
  onPress: (value: boolean, id: string, event: GestureResponderEvent) => void;
  /** onLongPress event returns the ID of the item (value is not changed) */
  onLongPress?: (id: string, event: GestureResponderEvent) => void;
  /** Text to use for radio button (accessibility). Defaults to ENGLISH "Radio button" */
  radioButtonText?: string;
  /** Style to set on the item */
  style?: StyleProp<ViewStyle>;
  /** Direct props to set on the React Native component (including iOS and Android specific props). Most use cases should not need this. */
  componentProps?: PressableProps;
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 13,
    paddingRight: 0,
    alignContent: 'flex-start',
  },
});

export class RadioButton extends React.Component<RadioButtonProps> {
  private get textStyle(): StyleProp<TextStyle> {
    const {disabled} = this.props;

    let finalStyle: any = {
      color: getColor(disabled ? 'textDisabled' : 'textPrimary'),
      marginLeft: 10,
    };

    return StyleSheet.create(finalStyle);
  }

  private get radioButton(): React.ReactNode {
    const {checked, disabled} = this.props;
    const finalParams = [22, 22, disabled ? getColor('iconDisabled') : getColor('iconPrimary')];

    return (
      <View>
        {checked ? createIcon(RadioButtonCheckedIcon, ...finalParams) : createIcon(RadioButtonIcon, ...finalParams)}
      </View>
    )
  }

  private onPress = (event: GestureResponderEvent): void => {
    const {onPress, checked, id} = this.props;

    if (typeof onPress === 'function') {
      onPress(!checked, id, event);
    }
  }

  private onLongPress = (event: GestureResponderEvent): void => {
    const {onLongPress, id} = this.props;

    if (typeof onLongPress === 'function') {
      onLongPress(id, event);
    }
  }

  render(): React.ReactNode {
    const {disabled, componentProps, label, radioButtonText, hideLabel, style} = this.props;

    return (
      <Pressable style={styleReferenceBreaker(styles.wrapper, style)} disabled={disabled} accessibilityLabel={radioButtonText || defaultText.radioButton} accessibilityHint={label} accessibilityRole="radio" onPress={this.onPress} onLongPress={this.onLongPress} {...(componentProps || {})}>
        {this.radioButton}
        {!hideLabel && <Text type="body-compact-02" style={this.textStyle} text={label} />}
      </Pressable>
    );
  }
}