package com.parkingapp.exception;
import org.springframework.http.*; import org.springframework.web.bind.MethodArgumentNotValidException; import org.springframework.web.bind.annotation.*; import java.time.OffsetDateTime; import java.util.*;
@RestControllerAdvice
public class ApiExceptionHandler {
 public record ErrorResponse(OffsetDateTime timestamp,int status,String error,String message){}

 @ExceptionHandler(NoSuchElementException.class)
 ResponseEntity<ErrorResponse> notFound(NoSuchElementException e){
  return response(HttpStatus.NOT_FOUND,e.getMessage());
 }

 @ExceptionHandler({IllegalArgumentException.class,IllegalStateException.class})
 ResponseEntity<ErrorResponse> badRequest(RuntimeException e){
  return response(HttpStatus.BAD_REQUEST,e.getMessage());
 }

 @ExceptionHandler(MethodArgumentNotValidException.class)
 ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException e){
  String msg=e.getBindingResult().getFieldErrors().stream().map(x->x.getField()+": "+x.getDefaultMessage()).findFirst().orElse("Invalid request");
  return response(HttpStatus.BAD_REQUEST,msg);
 }
 private ResponseEntity<ErrorResponse> response(HttpStatus s,String m){
  return ResponseEntity.status(s).body(new ErrorResponse(OffsetDateTime.now(),s.value(),s.getReasonPhrase(),m));
 }
}
