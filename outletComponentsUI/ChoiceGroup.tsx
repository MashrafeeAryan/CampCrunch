import { View, Text, TouchableOpacity } from 'react-native';
const ChoiceGroup = ({ title, subtitle, options, multiple = false, required = false, min = 0, max = 1, selected, onChange }) => {
  const handleSelect = (option) => {
    if (multiple) {
      let newSelection = [...selected];
      if (newSelection.includes(option)) {
        newSelection = newSelection.filter((o) => o !== option);
      } else if (max === 0 || newSelection.length < max) {
        newSelection.push(option);
      }
      onChange(newSelection);
    } else {
      onChange([option]);
    }
  };

  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
      {subtitle && (
        <Text style={{ fontSize: 14, color: required ? "red" : "#555" }}>
          {subtitle}
        </Text>
      )}

      {options.map((opt) => (
        <TouchableOpacity
          key={opt.label}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            borderBottomWidth: 0.5,
            borderColor: "#ccc",
          }}
          onPress={() => handleSelect(opt.label)}
        >
          <Text>{opt.label} {opt.price && `+ $${opt.price}`}</Text>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: multiple ? 4 : 10,
              borderWidth: 1,
              borderColor: "#333",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: selected.includes(opt.label) ? "#6b21a8" : "white",
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
