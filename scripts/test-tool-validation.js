function validateToolArguments(toolName, args) {
  const rules = {
    find_location: {
      nama: "string",
    },
    find_room: {
      nama: "string",
    },
  };

  const toolRules = rules[toolName];

  if (!toolRules) {
    return {
      valid: false,
      error: `Tool tidak dikenal: ${toolName}`,
    };
  }

  if (!args || typeof args !== "object") {
    return {
      valid: false,
      error: `Parameter untuk tool ${toolName} tidak valid.`,
    };
  }

  for (const [name, type] of Object.entries(toolRules)) {
    const value = args[name];

    if (value === undefined || value === null) {
      return {
        valid: false,
        error: `Parameter "${name}" wajib diisi.`,
      };
    }

    if (typeof value !== type) {
      return {
        valid: false,
        error: `Parameter "${name}" harus bertipe ${type}.`,
      };
    }

    if (type === "string" && value.trim() === "") {
      return {
        valid: false,
        error: `Parameter "${name}" tidak boleh kosong.`,
      };
    }
  }

  return {
    valid: true,
  };
}

console.log(
  "Test valid:",
  validateToolArguments("find_location", {
    nama: "Gedung GTI",
  })
);

console.log(
  "Test parameter kosong:",
  validateToolArguments("find_location", {
    nama: "",
  })
);

console.log(
  "Test parameter hilang:",
  validateToolArguments("find_location", {})
);

console.log(
  "Test tipe salah:",
  validateToolArguments("find_location", {
    nama: 123,
  })
);