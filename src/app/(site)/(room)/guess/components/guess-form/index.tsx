import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCookieStore } from "@/components/cookie/useCookieValue";
import { useAppSelector } from "@/stores";
import "./guess-form.css";

export interface GuessFormProps {
  answerUserName: string;
  question: string;
  choices: string[];
  showResult: boolean;
}

interface FormValues {
  guess: string;
}

const GuessForm: FC<GuessFormProps> = ({
  answerUserName,
  question,
  choices,
  showResult
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { roomName } = useAppSelector((state) => state.roomInfo);
  const userNameCookie = useCookieStore("userName");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(()=>{
    if(showResult) setIsLoading(true);
  }, [showResult])

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    const userName = userNameCookie.getValue();

    const otherInfo = {
      roomName: roomName,
      userName: userName,
    };

    const data = { ...otherInfo, ...formData };
    console.log("推測送信");
    console.log("%o", data);

    await fetch("/api/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });

  return (
    <div className="page-container">
      <div className="container">
        <div className="user-question-banner">
          <span className="user-name">{answerUserName}</span>
          <span className="question-for">さんはどれを選んだかな？</span>
        </div>

        <div className="question-header">
          <div className="question-icon">Q</div>
          <h2 className="question-title">{question}</h2>
        </div>

        <form onSubmit={onSubmit} className="question-form">
          <fieldset
            className={`form-fieldset ${errors.guess ? "invalid" : ""}`}
          >
            <Controller
              name="guess"
              control={control}
              defaultValue={choices[0]}
              render={({ field }) => (
                <div className="radio-group">
                  <div className="radio-stack">
                    {choices.map((choice) => (
                      <label key={choice} className="radio-item">
                        <input
                          type="radio"
                          name={field.name}
                          value={choice}
                          checked={field.value === choice}
                          onChange={() => field.onChange(choice)}
                          onBlur={field.onBlur}
                          className="radio-input"
                        />
                        <span className="radio-indicator"></span>
                        <span className="radio-text">{choice}</span>
                        {field.value === choice && (
                          <span className="radio-item-bg"></span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            />

            {errors.guess && (
              <div className="error-text">{errors.guess?.message}</div>
            )}

            <button type="submit" disabled={isLoading} className="submit-button">
              推測する
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default GuessForm;
